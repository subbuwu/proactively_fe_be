# Frontend Task :


# Backend Task : Speaker Booking Platform

## 🛠️ Tech Stack

- **Node.js**: Backend runtime environment.
- **Express.js**: Framework for building APIs and middleware.
- **TypeScript**: Strongly-typed JavaScript for better maintainability and development experience.
- **Prisma**: Database ORM for managing data models and querying the database.
- **Google APIs**: Used for Google Calendar integration to handle booking events and schedules.
- **Nodemailer**: Sends email notifications for booking confirmations and updates.

---

## 🚀 Features

### Users
- **Signup/Login**: 
  - Endpoints to register and authenticate users securely.
  - User roles: `USER` and `SPEAKER`.
  
### Speakers
- **Profile Setup**:
  - Create or update expertise and session pricing details.
  
- **Booking Management**:
  - View available time slots for a specific date.
  - Book time slots with speakers.

### Notifications
- **Google Calendar Integration**:
  - Automatically creates calendar events for confirmed bookings.
- **Email Notifications**:
  - Sends booking confirmation emails to both users and speakers.

---

## 📜 API Routes
## Visit /docs after setting up local server to see more

### Authentication
- **`POST /signup`**: User registration.
- **`POST /login`**: User login to receive authentication tokens.

### Speaker Profile Management
- **`POST /speaker/profile`**: Create or update speaker profiles.
  - **Requires authentication as `SPEAKER`.**

### Time Slot Viewing 
- **`GET /users/list-speakers?date=YYYY-MM-DD`**: Fetch available time slots for speakers on a specific date.
  - **Requires authentication.**

### Booking
- **`POST /users/book`**: Book a speaker for a specific time slot.
  - **Requires authentication as `USER`.**

---
