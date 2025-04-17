Complaint Management System
The Complaint Management System is a web application that enables citizens to submit and track grievances while providing administrators with tools to manage and resolve complaints efficiently. Hosted at https://ctggrievance.vercel.app/, it features a responsive UI, multilingual support, and secure authentication.
Features

Complaint Submission & Tracking: Citizens can submit complaints (category, description) and track statuses (Pending, In Progress, Resolved).
Role-Based Dashboards: Custom interfaces for citizens (view complaints) and admins (manage all complaints).
Multilingual Support: English and Bengali translations using i18next.
Secure Authentication: Firebase Authentication with email, Google sign-in, and password reset.
Responsive Design: Built with React, Tailwind CSS, and DaisyUI for a consistent experience across devices.
Planned Notifications: Email, SMS, and push notifications (via Firebase Cloud Functions and Twilio) for submission and status updates (in progress).

Tech Stack

Frontend: React, Vite, Tailwind CSS, DaisyUI, Firebase Authentication, i18next, React Router, React Toastify
Backend: Node.js, Express, MongoDB, Firebase Admin SDK
Deployment: Vercel
Planned Integrations: Firebase Cloud Functions (Nodemailer, FCM), Twilio (SMS)

Getting Started
Prerequisites

Node.js (>=18.x)
MongoDB Atlas account
Firebase project (for auth and notifications)
Twilio account (for SMS, optional)
Vercel account (for deployment)

Installation

Clone the Repository:
git clone https://github.com/your-username/complaint-management-system.git
cd complaint-management-system


Install Dependencies:
npm install
cd functions
npm install


Set Up Environment Variables:Create .env in the root and functions/.env:
# Root .env
VITE_apiKey=your-firebase-api-key
VITE_authDomain=your-firebase-auth-domain
VITE_projectId=your-firebase-project-id
VITE_storageBucket=your-firebase-storage-bucket
VITE_messagingSenderId=your-firebase-sender-id
VITE_appId=your-firebase-app-id
VITE_vapidKey=your-firebase-vapid-key
DB_USER=your-mongodb-username
DB_PASS=your-mongodb-password
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY="your-firebase-private-key"
FIREBASE_CLIENT_EMAIL=your-firebase-client-email

# functions/.env
email.user=your-email@gmail.com
email.pass=your-email-app-password
twilio.sid=your-twilio-sid
twilio.token=your-twilio-token
twilio.phone=your-twilio-phone-number


Run Locally:
npm run dev

The app runs at http://localhost:5173.

Set Up Firebase Functions:
cd functions
firebase deploy --only functions


MongoDB Setup:

Create a MongoDB Atlas cluster.
Update schemas in models/User.js and models/Complaint.js for phone, fcmToken, notificationPreferences, and complaintId.



API Endpoints

POST /users: Register/update user (email, name, role, phone, fcmToken).
GET /users/:email: Fetch user details.
PUT /users/:email: Update user (role, phone, preferences).
POST /complaints: Submit a complaint.
GET /complaints/user/:email: Get user’s complaints.
PUT /complaints/:id: Update complaint status and history.
GET /category: List complaint categories.

Project Structure
├── public/                 # Static assets
├── src/
│   ├── components/         # React components (e.g., SubmitComplaint.jsx, Profile.jsx)
│   ├── firebase/           # Firebase config (firebase.config.js)
│   ├── Providers/          # Auth context (AuthProvider.jsx)
│   ├── locales/            # i18next translations (en/bn)
│   ├── main.jsx            # App entry
├── models/                 # MongoDB schemas (User.js, Complaint.js)
├── functions/              # Firebase Cloud Functions
├── server.js               # Node.js/Express backend
├── .env                    # Environment variables
└── README.md

Testing

Credentials:
Admin: fejoridaca@mailinator.com / Pa$$w0rd!
Citizen: cufy@mailinator.com / Pa$$w0rd!


Steps:
Log in as a citizen, submit a complaint, and check for notifications (once implemented).
Log in as an admin, update complaint status, and verify notifications.
Toggle language (English/Bengali) in the navbar.



Contributing

Fork the repository.
Create a feature branch (git checkout -b feature/YourFeature).
Commit changes (git commit -m 'Add YourFeature').
Push to the branch (git push origin feature/YourFeature).
Open a Pull Request.

License
This project is licensed under the MIT License.
Acknowledgments

Built with ❤️ using React, Firebase, and Node.js.
Special thanks to the open-source community for tools like Tailwind CSS and i18next.

