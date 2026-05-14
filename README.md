# IssueHub

IssueHub is a complaint management system built to simplify and speed up the complaint resolution process inside educational institutions.

In many colleges, complaints usually move through multiple administrative layers before reaching the actual authority responsible for solving the issue. Because of this, even simple issues like broken classroom equipment or academic complaints can take weeks to resolve.

IssueHub was built to reduce this delay by creating a centralized platform where students can directly raise complaints, track their status, and receive updates in real time.

---

## Problem Statement

Traditional complaint workflows in many colleges are slow and inefficient.

A complaint usually moves through several levels:

Student → Class Teacher → Coordinator → HOD/Director → Concerned Authority

Because of this process, resolving even basic issues can take 15–20 days.

IssueHub attempts to solve this problem by reducing unnecessary communication layers and ensuring complaints reach the responsible authority more efficiently.

Traditional Workflow:
Student → Teacher → Coordinator → HOD → Authority

IssueHub Workflow:
Student → Concerned Authority

---

## How the System Works

The platform contains three dashboards:

### Student Dashboard
Students can:
- Register and login securely
- Verify email using OTP authentication
- Submit complaints with images
- Track complaint status in real time

---

### Team Dashboard
The team dashboard acts as a moderation layer.

The moderation team reviews complaints before forwarding them to the admin dashboard to ensure:
- complaints are genuine
- uploaded content does not contain vulgar, abusive, or inappropriate material

After verification, complaints can be:
- forwarded
- rejected
- marked for review

---

### Admin Dashboard
Admins can:
- view forwarded complaints
- update complaint status
- resolve complaints
- monitor complaint activity

Students can continuously track updates such as:
- Submitted
- Forwarded
- Rejected
- Resolved

---

## Key Engineering Decisions

### 1. Async OTP Processing using Celery + Redis

During development, I noticed that sending OTP emails during registration caused API responses to slow down because SMTP operations are blocking.

To solve this problem:
- FastAPI delegates email tasks to Celery workers
- Redis is used as the message broker
- OTP emails are processed asynchronously in the background

This improved API responsiveness and created a smoother user experience.

---

### 2. Pagination for Dashboard Performance Optimization

The Team and Admin dashboards may eventually need to handle a large number of complaints.

Fetching all complaints at once would increase database load and reduce dashboard performance.

To solve this problem:
- MongoDB pagination was implemented
- complaints are fetched in smaller batches
- only a limited number of complaints are loaded at a time

This improves:
- scalability
- response performance
- dashboard efficiency
- database query optimization

---

## Tech Stack

| Technology | Purpose |
|------------|----------|
| React.js | Frontend |
| FastAPI | Backend API |
| MongoDB | Database |
| Redis | Broker / Caching |
| Celery | Background Task Queue |
| JWT | Authentication |
| DaisyUI | UI Components |

---

## Backend Engineering Focus

The primary focus of this project was backend engineering, API design, and scalable application architecture.

The backend was structured using separate layers for:
- APIs
- services
- schemas
- configuration

This separation improved readability, maintainability, and scalability.

The project also includes:
- JWT-based authentication
- OTP email verification
- Role-Based Access Control (RBAC)
- Proper HTTP status handling
- Exception handling
- Modular API structure

---

## Screenshots

### Login Page
<img width="989" height="968" alt="image" src="https://github.com/user-attachments/assets/a79612e8-5bb2-4aee-a25d-ef354396771d" />

---

### Student Dashboard
<img width="1363" height="781" alt="image" src="https://github.com/user-attachments/assets/9b821826-e943-40fb-bb4d-9f04a6ac0939" />

---


### Studnt Complaint Form
<img width="1441" height="934" alt="image" src="https://github.com/user-attachments/assets/463ee43d-de68-43ef-9def-eaa8bda0e0e6" />

---

### Team Dashboard
<img width="1885" height="784" alt="image" src="https://github.com/user-attachments/assets/3cbcd86e-a896-49ee-a6af-713ba6889d09" />


---

### Admin Dashboard
<img width="505" height="731" alt="image" src="https://github.com/user-attachments/assets/c62ff70b-512f-4888-91a2-4846cdefeb2c" />


---



## Running Locally

### Backend

```bash
cd BACKEND
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

```bash
cd FRONTEND
npm install
npm run dev
```

---

## Future Improvements

Some planned improvements for the project include:
- AI-based complaint moderation
- Automated toxicity detection
- Real-time notifications
- Complaint analytics dashboard
- Priority-based complaint classification

---

## What I Learned

Through this project, I gained practical experience with:
- FastAPI backend development
- REST API design
- Redis integration
- Celery background workers
- JWT authentication
- RBAC implementation
- MongoDB pagination
- Async task processing
- Backend modularization
- Frontend-backend communication
- Solving real-world workflow problems
