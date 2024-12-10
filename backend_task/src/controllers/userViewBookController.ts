import { prisma } from '@/config';
import { createCalendarEvent, sendBookingEmail } from '@/utils/googleCalender';
import { parseCustomDateFormat } from '@/utils/parseCustomBodyToIST';
import { convertToIST, formatToCustomString, generateAvailableTimeSlots } from '@/utils/timeSlotGenerator';
import { Request, Response } from 'express';

export const speakerViewController = async (req: Request, res: Response) => {
  try {
    const { date } = req.query;
    
    if (!date || typeof date !== 'string') {
      res.status(400).json({ error: 'Date is required' });
    }
  
    const selectedDate = new Date(date as string);
    const istSelectedDate = convertToIST(selectedDate);
    
    // Set the time range for the selected date
    const startOfDay = new Date(istSelectedDate);
    startOfDay.setHours(9, 0, 0, 0);
    
    const endOfDay = new Date(istSelectedDate);
    endOfDay.setHours(16, 0, 0, 0);
    
    // Find speakers with their bookings
    const speakers = await prisma.speaker.findMany({
      include: {
        User: {
          select: {
            firstName: true,
            lastName: true,
          }
        },
        bookings: {
          where: {
            dateTime: {
              gte: startOfDay,
              lt: endOfDay
            }
          },
          select: {
            dateTime: true
          }
        }
      }
    });
    
    // Process available time slots for each speaker
    const speakersWithAvailability = speakers.map(speaker => {
      const allPossibleSlots = generateAvailableTimeSlots(istSelectedDate);
      
      // Filter out booked slots
      const availableSlots = allPossibleSlots.filter(slotStr => {
        const slotDate = parseCustomDateFormat(slotStr);
        return !speaker.bookings.some(booking => {
          const bookedDate = new Date(booking.dateTime);
          return slotDate.getTime() === bookedDate.getTime();
        });
      });
      
      return {
        id: speaker.id,
        fullName: `${speaker.User.firstName} ${speaker.User.lastName}`,
        availableSlots
      };
    });
    
    res.json(speakersWithAvailability);
  } catch (error) {
    console.error('Error fetching speakers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Book a speaker
export const bookSpeakerController = async (req: Request, res: Response) => {
  try {
    const { speakerId, dateTime } = req.body;
    
    // @ts-ignore (assuming middleware adds user)
    const user = req.user;
    // @ts-ignore
    const userId = req.user.userId;
    
    if (!speakerId || !dateTime) {
       res.status(400).json({ error: 'Speaker ID and dateTime are required' });
    }
    
    if (user.userType !== 'USER') {
       res.status(403).json({
        message: "Speakers are not allowed to book"
      });
    }
    
    // Parse and convert the booking time to IST
    const bookingDateTime = parseCustomDateFormat(dateTime);
    
    // Validate booking time (9 AM - 4 PM IST)
    const hours = bookingDateTime.getHours();
    if (hours < 9 || hours >= 16) {
       res.status(400).json({
        error: 'Booking is only allowed between 9 AM and 4 PM IST'
      });
    }
    
    // Check if the slot is already booked
    const existingBooking = await prisma.booking.findFirst({
      where: {
        AND: [
          { speakerId },
          { dateTime: bookingDateTime }
        ]
      }
    });
    
    if (existingBooking) {
       res.status(400).json({
        error: 'This time slot is already booked'
      });
    }
    
    // Get speaker and user details for notification
    const speaker = await prisma.speaker.findUnique({
      where: { id: speakerId },
      include: {
        User: true
      }
    });

    const bookedUser = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!speaker || !bookedUser) {
       res.status(404).json({ error: 'Speaker or user not found' });
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        userId,
        speakerId,
        dateTime: bookingDateTime
      }
    });

    // Calculate meeting end time (assuming 30-minute slots)
    const endDateTime = new Date(bookingDateTime);
    endDateTime.setMinutes(endDateTime.getMinutes() + 60);

    // Create calendar event
    await createCalendarEvent(
      `Meeting with ${speaker?.User.firstName} ${speaker?.User.lastName}`,
      `Booked session with speaker ${speaker?.User.firstName} ${speaker?.User.lastName}`,
      bookingDateTime,
      endDateTime,
      [bookedUser?.email ?? '', speaker?.User.email ?? '']
    );

    // Send email to user
    await sendBookingEmail(
      bookedUser?.email ?? '',
      'Booking Confirmation',
      `
      <h1>Booking Confirmed</h1>
      <p>Your booking with ${speaker?.User.firstName} ${speaker?.User.lastName} has been confirmed on topic .</p>
      <p>Date: ${formatToCustomString(bookingDateTime)}</p>
      <p>Duration: 30 minutes</p>
      <p>A calendar invitation has been sent to your email.</p>
      `
    );

    // Send email to speaker
    await sendBookingEmail(
      speaker?.User.email ?? '',
      'New Booking Notification',
      `
      <h1>New Booking</h1>
      <p>You have a new booking with ${bookedUser?.firstName} ${bookedUser?.lastName}.</p>
      <p>Date: ${formatToCustomString(bookingDateTime)}</p>
      <p>Duration: 30 minutes</p>
      <p>A calendar invitation has been sent to your email.</p>
      `
    );

     res.status(201).json({
      ...booking,
      dateTime: formatToCustomString(new Date(booking.dateTime)),
      message: 'Booking confirmed. Calendar invites and emails have been sent.'
    });
  } catch (error) {
    console.error('Error booking speaker:', error);
     res.status(500).json({ error: 'Internal server error' });
  }
};

