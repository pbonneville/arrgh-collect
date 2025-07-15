# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Firebase Configuration
- `npm run firebase:config` - Interactive Firebase configuration setup (runs `node scripts/update-firebase-config.js`)

### Firebase Deployment
- `firebase deploy --only apphosting` - Deploy to Firebase App Hosting
- `firebase use <project-id>` - Switch Firebase project

## Project Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router and TypeScript
- **Styling**: Tailwind CSS v4 with dark mode support
- **Backend**: Firebase (Firestore, Authentication, Storage)
- **Hosting**: Firebase App Hosting
- **Fonts**: Geist Sans and Geist Mono

### Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with metadata and fonts
│   ├── page.tsx           # Landing page with feature preview
│   └── globals.css        # Global styles
└── lib/
    └── firebase.ts        # Firebase initialization and config
```

### Key Files
- `apphosting.yaml` - Firebase App Hosting configuration with Node.js 20 runtime
- `firebase.json` - Firebase project configuration
- `scripts/update-firebase-config.js` - Interactive Firebase setup helper
- `tsconfig.json` - TypeScript configuration with `@/*` path aliases

## Firebase Setup

The project uses Firebase App Hosting with automatic GitHub deployments. Firebase configuration is managed through environment variables:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

Use `npm run firebase:config` to set up configuration interactively, or see `FIREBASE_SETUP.md` for manual setup instructions.

## Development Notes

### Current State
- Minimal landing page with feature preview
- Firebase integration set up but not fully implemented
- Ready for collection management features to be built

### Code Style
- Uses TypeScript strict mode
- Tailwind CSS for styling with dark mode support
- Next.js App Router with React 19
- Path aliases configured (`@/*` → `./src/*`)

### Deployment
- Pushes to `main` branch trigger automatic Firebase App Hosting deployment
- Build process: `npm ci` → `npm run build`
- Runtime: Node.js 20 with 1 CPU, 1GiB memory