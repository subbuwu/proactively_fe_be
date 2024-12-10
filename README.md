# Frontend UI Task

## Overview
This project involves building a user interface (UI) using React and SCSS of the figma file given in [Figma](https://www.figma.com/design/wwc4WEkrkQi1K5DkV4938N/Frontend-Task?node-id=0-1&node-type=canvas&t=Kkl0BtQ4KU1nMvUc-0). The task is focused on creating responsive and reusable components, styling them with SCSS, and ensuring the UI is functional and aesthetically pleasing.

## Features
- Built with **React** for the component-based architecture.
- Styled using **SCSS** for modular and scalable styles.
- Responsive design to support various screen sizes.
- Clear separation of concerns between UI logic and styling.

## Tech Stack
- **React** (v18+)
- **SCSS**

*---------------------------------------------------*

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
