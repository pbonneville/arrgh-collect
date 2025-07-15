# Arrgh Collect

A modern collection management platform built with Next.js and Firebase App Hosting.

## 🚀 Features

- **Organize Collections**: Intuitive tools for categorizing and managing items
- **Track Progress**: Detailed analytics and insights for collection growth
- **Secure Storage**: Enterprise-grade security with Firebase backend
- **Responsive Design**: Beautiful UI with Tailwind CSS and dark mode support

## 🛠 Tech Stack

- **Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **Backend**: Firebase (Firestore, Authentication, Storage)
- **Hosting**: Firebase App Hosting
- **CI/CD**: GitHub Actions

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 20+
- Firebase CLI
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/pbonneville/arrgh-collect.git
cd arrgh-collect
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
# Edit .env.local with your Firebase configuration
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Firebase Setup

Due to permission restrictions with CLI project creation, please follow the manual setup:

1. **Manual Setup**: See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for detailed instructions
2. **Quick Config**: Use the helper script after creating your project:
   ```bash
   node scripts/update-firebase-config.js
   ```
3. **GitHub Integration**: Connect your repository in Firebase Console for auto-deployment

## 🚀 Deployment

This project is configured for Firebase App Hosting with automatic GitHub deployments:

1. Push to the `main` branch triggers automatic deployment
2. GitHub Actions runs tests and builds the project
3. Firebase App Hosting deploys to global CDN

### Manual Deployment

```bash
firebase deploy --only apphosting
```

## 📊 Cost Estimation

- **Development**: Free (within Firebase free tier)
- **Low Traffic**: $0-5/month
- **Moderate Traffic**: $10-25/month

See [Firebase Pricing](https://firebase.google.com/pricing) for detailed information.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- [Live Demo](https://arrgh-collect.web.app) (Coming Soon)
- [Firebase Console](https://console.firebase.google.com)
- [GitHub Repository](https://github.com/pbonneville/arrgh-collect)
