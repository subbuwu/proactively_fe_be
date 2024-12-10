# Frontend Task :


# Backend Task : Speaker Booking Platform

## 🛠️ Tech Stack

- **Node.js**: Backend runtime environment.
- **Express.js**: Framework for building APIs and middleware.
- **TypeScript**: Strongly-typed JavaScript for better maintainability and development experience.
- **Prisma**: Database ORM for managing data models and querying the database.
- **Google APIs**: Used for Google Calendar integration to handle booking events and schedules.
- **Nodemailer**: Sends email notifications for booking confirmations and updates.
- **SwaggerDocs + UI**: Provides API Documentation at /docs endpoint.

## 📊 Database Schema

### User Table
- **id**: Primary key, auto-incremented.
- **firstName**: String (max 50 characters).
- **lastName**: String (max 50 characters).
- **email**: Unique, String (max 100 characters).
- **otp**: String (nullable).
- **otpExpiry**: DateTime (nullable).
- **password**: String.
- **isVerified**: Boolean (default: false).
- **userType**: Enum (USER, SPEAKER).
- **createdAt**: DateTime (default: now).
- **updatedAt**: DateTime (auto-updated).
- **speaker**: Relation to Speaker.
- **bookings**: Relation to Booking.

### Speaker Table
- **id**: Primary key, auto-incremented.
- **expertise**: String (max 100 characters).
- **pricePerSession**: Float.
- **userId**: Unique, foreign key to User.
- **bookings**: Relation to Booking.

### Booking Table
- **id**: Primary key, auto-incremented.
- **userId**: Foreign key to User.
- **speakerId**: Foreign key to Speaker.
- **dateTime**: DateTime (unique per speaker).


## 📜 API Routes
## Checkout /docs endpoint after runnning local server to see swagger docs

### Authentication
- **`POST /signup`**: User (USER + SPEAKER) registration.
- **`POST /login`**: User (USER + SPEAKER) login to receive authentication tokens.

### Speaker Profile Management (FOR SPEAKER)
- **`POST /speakers/profile`**: Create or update speaker profiles.
  - **Requires authentication as `SPEAKER`.**

### Time Slot Viewing (FOR USER->USER)
- **`GET /users/list-speakers?date=YYYY-MM-DD`**: Fetch available time slots for speakers on a specific date.
  - **Requires authentication.**

### Booking (FOR USER->USER)
- **`POST /users/book`**: Book a speaker for a specific time slot.
  - **Requires authentication as `USER`.**

---
