# FeedbackMessage - Anonymous Messaging Platform

## Overview
FeedbackMessage is a Next.js application that allows users to receive anonymous messages. Key features include:
- User authentication (sign up, verify, login)
- Anonymous message receiving
- Message management (view, delete)
- User profile customization
- API endpoints for integration

## Getting Started

### Prerequisites
- Node.js (v18.17.0 or higher)
- MongoDB database
- Resend API key (for email verification)

### Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create `.env` file with required environment variables:
```env
MONGODB_URI=your_mongodb_connection_string
RESEND_API_KEY=your_resend_api_key
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

## Features

### Authentication
- **Sign Up**: Users can register with email, username and password
- **Email Verification**: Users receive 6-digit verification code via email
- **Login**: Users can login with username/email and password

### Messaging
- **Receive Messages**: Anonymous users can send messages to registered users
- **Message Management**: Users can view and delete received messages
- **Message Settings**: Users can toggle message acceptance

### User Profile
- Custom profile page at `/u/[username]`
- Public message display
- Profile customization options

## API Reference

### Authentication
- `POST /api/sign-up` - User registration
- `POST /api/verify-code` - Email verification
- `POST /api/auth/[...nextauth]` - NextAuth authentication

### Messages
- `GET /api/get-messages` - Get user messages
- `POST /api/send-message` - Send anonymous message
- `DELETE /api/delete-message/[messageid]` - Delete message
- `GET /api/check-username-unique` - Check username availability
- `POST /api/accept-messages` - Toggle message acceptance
- `POST /api/suggest-messages` - Get message suggestions

## Database Schema

### User Model
```typescript
interface User {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  isAcceptingMessages: boolean;
  verifyCode: string;
  verifyCodeExpiry: Date;
  messages: Message[];
}
```

### Message Model
```typescript
interface Message {
  content: string;
  createdAt: Date;
}
```

## Components

### UI Components (using shadcn/ui)
- `Navbar` - Main navigation
- `Footer` - Page footer
- `Message` - Message display component
- `AlertDialog` - Confirmation dialogs
- `Form` - Form components with validation
- `Toaster` - Notification system

## Deployment

### Vercel
1. Set up environment variables in Vercel dashboard
2. Connect your GitHub repository
3. Deploy!

### Docker
```bash
docker build -t feedbackmessage .
docker run -p 3000:3000 feedbackmessage
```

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License
MIT
