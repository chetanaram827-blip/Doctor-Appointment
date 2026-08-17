# Doctor Appointment Backend

## 📌 Project Description

Doctor Appointment Backend is a REST API based application built using Node.js, Express.js and MongoDB.

The system allows users to manage areas, hospitals, departments, doctors, time slots and doctor appointments.

## 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- REST API
- HTML/CSS/JavaScript

## ✨ Features

- Manage areas
- Manage hospitals
- Manage departments
- Manage doctors
- Create doctor time slots
- Book appointments
- Prevent double booking
- View appointments
- Update appointments
- Delete appointments
- Automatically make the time slot available after appointment cancellation

## 🔄 Appointment Flow

Area
↓
Hospital
↓
Department
↓
Doctor
↓
Time Slot
↓
Appointment

## 📁 Project Structure

Doctor-Appointment/
│
├── config/
│   └── db.js
│
├── models/
│   ├── Appointment.js
│   ├── Doctor.js
│   ├── Hospital.js
│   ├── Department.js
│   └── TimeSlot.js
│
├── routes/
│   ├── areaRoutes.js
│   ├── hospitalRoutes.js
│   ├── department.route.js
│   ├── doctor.route.js
│   └── timeslot.route.js
│
├── public/
│
├── server.js
├── package.json
├── .env
└── README.md

## 🔗 API Endpoints

### Area

GET /areas

POST /areas

### Hospital

GET /hospitals

POST /hospitals

### Department

GET /departments

POST /departments

### Doctor

GET /doctors

POST /doctors

### TimeSlot

GET /timeslots

POST /timeslots

### Appointment

GET /appointments

POST /appointments

PUT /appointments/:id

DELETE /appointments/:id

## ▶️ How to Run

### 1. Install dependencies

npm install

### 2. Configure MongoDB

Create a `.env` file and add:

PORT=5000
MONGO_URI=your_mongodb_connection_string

### 3. Start the server

node server.js

The server will run on:

http://localhost:5000

## 📌 Appointment Booking Logic

When a patient books an available time slot:

isBooked = true

If the same slot is already booked, another appointment cannot be created for that slot.

When an appointment is deleted:

isBooked = false

The time slot becomes available again.

## ✅ Project Status

Backend APIs are implemented and tested successfully.

Area, Hospital, Department, Doctor, TimeSlot and Appointment APIs are working.