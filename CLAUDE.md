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
- **Authentication**: NextAuth.js with GitHub OAuth provider
- **Editor**: MDXEditor for enhanced markdown editing experience
- **API Integration**: GitHub REST API via Octokit for repository operations
- **Styling**: Tailwind CSS v4 with dark mode support
- **Hosting**: Google Cloud Run with buildpacks (automatic containerization)
- **Fonts**: Geist Sans and Geist Mono
- **Runtime**: Node.js 20.x

### Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth.js authentication
│   │   └── files/         # File management endpoints
│   ├── dashboard/         # Main application interface
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Landing page with GitHub login
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── FileList.tsx       # Repository file browser
│   ├── MarkdownEditor.tsx # MDX editor with frontmatter
│   ├── FrontmatterForm.tsx # YAML metadata form
│   ├── CreateFileModal.tsx # New file creation
│   └── Providers.tsx      # NextAuth session provider
├── lib/                   # Utility libraries
│   ├── auth.ts           # NextAuth configuration
│   └── github.ts         # GitHub API client
└── types/                 # TypeScript definitions
    └── index.ts
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

### Current State - Phase 1 MVP Complete ✅
- **Full GitHub OAuth Authentication**: NextAuth.js integration with repository permission mapping
- **File Management System**: Browse, create, edit markdown files from GitHub repository
- **Enhanced Editor**: MDXEditor with frontmatter forms and live preview
- **Pull Request Workflow**: Automatic branch creation and PR generation for all changes
- **Responsive Design**: Mobile-optimized with collapsible sidebars
- **Role-Based Access**: Owner, Maintainer, Contributor, Reader permissions
- **Production Ready**: Successfully builds and deploys on Cloud Run

### Repository Status
- **Repository**: https://github.com/Paul-Bonneville-Labs/arrgh-collect
- **Main branch**: Deployable and tested
- **Last major change**: Migration from Firebase App Hosting to Cloud Run
- **Security**: Domain Restricted Sharing policy resolved

### Code Style
- Uses TypeScript strict mode
- Tailwind CSS for styling with dark mode support
- Next.js App Router with React 19
- Path aliases configured (`@/*` → `./src/*`)
- No external dependencies beyond Next.js core

### Build Process
- Buildpacks automatically detect Next.js
- Uses Node.js 20.x runtime (specified in package.json engines)
- Production build: `npm ci` → `npm run build` → `npm start`
- No custom configuration required
- No Dockerfile needed

### Deployment Status
- **Platform**: Google Cloud Run
- **Method**: Buildpacks (automatic containerization)
- **Public Access**: Enabled
- **Scaling**: Managed by Cloud Run
- **Cost**: Pay-per-use model