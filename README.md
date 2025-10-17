# 💳 Stripe E-Commerce Course Platform

This is a **modern e-learning platform** where users can:

* 🎓 **Purchase individual courses** (one-time payments)
* 💼 **Subscribe monthly** to gain **unlimited access** to all course materials
* 📹 Access **exclusive video content** and learning resources after successful payment

The app integrates **Stripe** for payments and subscriptions, **Firebase** for authentication and course data management, and **React + React Query** for a smooth, real-time user experience.

---

## 🚀 Features

### 👩‍🎓 Users

* Create an account and log in with **Firebase Authentication**
* Browse all available courses
* Purchase an individual course via **Stripe Checkout**
* Subscribe to a monthly plan to unlock all courses
* Access purchased or subscription-based course materials (videos, etc.)

---

## 🧱 Tech Stack

| Layer           | Technology                               |
| --------------- | ---------------------------------------- |
| Frontend        | React 19, Vite, TailwindCSS, React Query |
| Backend         | Node.js, Express                         |
| Database / Auth | Firebase Admin SDK                       |
| Payments        | Stripe API                               |
| State & Data    | React Query                              |
| Styling         | TailwindCSS                              |
| Language        | TypeScript                               |

---

## 📂 Project Structure

```
stripe-ecommerce-app/
├── server/
│   ├── src/
│   │   ├── index.ts                 # Express entry point
│   │   ├── routes/stripe.ts         # /api/checkout, /api/subscribe, /stripe-webhooks
│   │   └── utils/firebase.ts        # Firebase Admin setup
│   ├── .env                         # Server environment variables
│   └── package.json
│
├── client/
│   ├── src/
│   │   ├── App.tsx                  # Root component
│   │   ├── pages/                   # Home, Course, Checkout, Subscription, Dashboard
│   │   ├── components/              # Course cards, payment UI, navbar, etc.
│   │   ├── hooks/                   # React Query hooks for data fetching
│   │   └── lib/firebase.ts          # Firebase client setup
│   ├── tailwind.config.ts
│   ├── vite.config.ts
│   └── package.json
│
└── README.md
```

---

## ⚙️ Backend Setup

### 1. Navigate to the server

```bash
cd server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```bash
STRIPE_SECRET_KEY=sk_test_**************
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nABC123...\n-----END PRIVATE KEY-----\n"
FRONTEND_URL=http://localhost:5173
PORT=4000
```

### 4. Run the server

```bash
npm run dev
```

Server will start at:

```
http://localhost:4000
```

---

## 🧩 API Endpoints

| Method | Endpoint           | Description                                                                                           |
| ------ | ------------------ | ----------------------------------------------------------------------------------------------------- |
| `POST` | `/api/checkout`    | Creates a one-time **Stripe Checkout session** for purchasing a course                                |
| `POST` | `/api/subscribe`   | Creates a **Stripe Subscription session** for monthly access                                          |
| `POST` | `/stripe-webhooks` | Handles Stripe **webhook events** (payment success, subscription updates) — accessible only to Stripe |

---

### 💡 Example: One-Time Checkout

**Request**

```bash
POST http://localhost:4000/api/checkout
Content-Type: application/json
```

**Body**

```json
{
  "userId": "uid123",
  "courseId": "course_001"
}
```

**Response**

```json
{
  "url": "https://checkout.stripe.com/pay/cs_test_..."
}
```

---

### 💡 Example: Subscription Checkout

**Request**

```bash
POST http://localhost:4000/api/subscribe
Content-Type: application/json
```

**Body**

```json
{
  "userId": "uid123"
}
```

**Response**

```json
{
  "url": "https://checkout.stripe.com/subscription/cs_test_..."
}
```

---

### 💡 Stripe Webhook Event Example

**Route:** `/stripe-webhooks`
Handles:

* `checkout.session.completed`
* `customer.subscription.created`
* `customer.subscription.deleted`

Used to **grant or revoke access** to content in Firebase.

---

## 🔐 Firebase Integration

* **Firebase Admin SDK** is used on the backend for secure read/write access.
* **Firebase Authentication** is used on the frontend to manage user sessions.
* Purchases and subscriptions are stored in Firestore for access control.

---

## 💻 Frontend Setup

### 1. Navigate to the client

```bash
cd client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```bash
VITE_API_URL=http://localhost:4000
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Run the app

```bash
npm run dev
```

Frontend will be available at:

```
http://localhost:5173
```

---

## 🧠 How It Works

1. User logs in via Firebase.
2. Chooses either:

   * A **single course purchase**, or
   * A **monthly subscription**.
3. Backend creates a Stripe Checkout Session and returns a `checkout_url`.
4. User completes payment on Stripe.
5. Stripe triggers the **webhook**, confirming payment.
6. Backend updates user’s course access in Firebase.
7. User gains access to the purchased or subscription-based courses in the UI.

---

## 🧰 Scripts

| Command         | Description                |
| --------------- | -------------------------- |
| `npm run dev`   | Run the development server |
| `npm run build` | Build the project          |
| `npm start`     | Run the compiled app       |
| `npm run lint`  | Lint all files             |

---

## 🔒 Environment Variables Summary

| Variable                | Description                        |
| ----------------------- | ---------------------------------- |
| `STRIPE_SECRET_KEY`     | Stripe API secret key              |
| `FRONTEND_URL`          | Client URL for redirect            |
| `FIREBASE_PROJECT_ID`   | Firebase project ID                |
| `FIREBASE_CLIENT_EMAIL` | Firebase admin client email        |
| `FIREBASE_PRIVATE_KEY`  | Private key for Firebase Admin SDK |
| `PORT`                  | Server port (default: 4000)        |

---
