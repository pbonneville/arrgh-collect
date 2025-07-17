# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Cloud Run Deployment
- `gcloud run deploy arrgh-collect --source . --region us-central1` - Deploy to Google Cloud Run
- `gcloud services enable run.googleapis.com cloudbuild.googleapis.com` - Enable required APIs

## Project Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router and TypeScript
- **Styling**: Tailwind CSS v4 with dark mode support
- **Hosting**: Google Cloud Run with buildpacks
- **Fonts**: Geist Sans and Geist Mono
- **Runtime**: Node.js 20.x

### Project Structure
```
src/
└── app/                    # Next.js App Router
    ├── layout.tsx         # Root layout with metadata and fonts
    ├── page.tsx           # Landing page with feature preview
    └── globals.css        # Global styles
```

### Key Files
- `package.json` - Node.js 20.x engine specification for buildpacks
- `tsconfig.json` - TypeScript configuration with `@/*` path aliases
- `.env.local` - Local development environment variables

## Cloud Run Deployment

The project uses Google Cloud Run with buildpacks for automatic containerization. No Dockerfile required - buildpacks auto-detect Next.js and configure appropriately.

### Prerequisites
```bash
# Install Google Cloud CLI
# Initialize gcloud: gcloud init
# Set project: gcloud config set project YOUR_PROJECT_ID
# Enable APIs: gcloud services enable run.googleapis.com cloudbuild.googleapis.com
```

### Deployment Process
```bash
# Deploy from source (buildpacks auto-detect Next.js)
gcloud run deploy arrgh-collect --source . --region us-central1 --allow-unauthenticated

# Deploy with custom settings
gcloud run deploy arrgh-collect \
  --source . \
  --region us-central1 \
  --memory 1Gi \
  --cpu 1 \
  --max-instances 100 \
  --allow-unauthenticated
```

## Development Notes

### Current State
- Clean Next.js application with landing page
- No backend dependencies
- Ready for collection management features to be built
- Configured for Cloud Run deployment with buildpacks

### Code Style
- Uses TypeScript strict mode
- Tailwind CSS for styling with dark mode support
- Next.js App Router with React 19
- Path aliases configured (`@/*` → `./src/*`)

### Build Process
- Buildpacks automatically detect Next.js
- Uses Node.js 20.x runtime (specified in package.json engines)
- Production build: `npm ci` → `npm run build` → `npm start`
- No custom configuration required