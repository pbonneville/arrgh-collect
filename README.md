# Text Management Application

A GitHub-backed markdown file management system with OAuth authentication and pull request workflows. Organize, edit, and collaborate on your documentation seamlessly.

## 🚀 Features

### Core Functionality
- **GitHub OAuth Authentication**: Secure login with repository permission mapping
- **File Management Interface**: Browse and manage `.md` files from your GitHub repository root
- **Enhanced Markdown Editor**: Rich text editing with MDXEditor, frontmatter forms, and live preview
- **Pull Request Workflow**: All changes automatically create PRs for review and collaboration
- **Responsive Design**: Mobile-optimized interface with collapsible sidebars

### User Experience
- **Role-Based Access**: Automatic role mapping from GitHub repository permissions (Owner, Maintainer, Contributor, Reader)
- **Real-Time Feedback**: Loading states, error handling, and success notifications
- **Search & Filter**: Quickly find files with built-in search functionality
- **Dark Mode Support**: Beautiful UI that adapts to system preferences

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router and TypeScript
- **Authentication**: NextAuth.js with GitHub OAuth provider
- **Editor**: MDXEditor for enhanced markdown editing
- **Styling**: Tailwind CSS v4 with dark mode support
- **API Integration**: GitHub REST API via Octokit
- **Deployment**: Google Cloud Run with buildpacks
- **Runtime**: Node.js 20.x

## 🏃‍♂️ Quick Start

### Prerequisites

- **Node.js 20+**: Required for the Next.js application
- **GitHub Account**: For OAuth authentication and repository access
- **GitHub Repository**: A repository containing `.md` files you want to manage
- **GitHub OAuth App**: Create one at [GitHub Developer Settings](https://github.com/settings/applications/new)

### Setup Instructions

#### 1. Clone the Repository
```bash
git clone https://github.com/Paul-Bonneville-Labs/arrgh-collect.git
cd arrgh-collect
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Configure Environment Variables
```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values:
```bash
# GitHub OAuth Configuration
GITHUB_CLIENT_ID=your_github_oauth_client_id
GITHUB_CLIENT_SECRET=your_github_oauth_client_secret

# GitHub Repository Configuration  
GITHUB_TOKEN=ghp_your_github_personal_access_token
GITHUB_REPO_OWNER=your-github-username
GITHUB_REPO_NAME=your-content-repository-name

# NextAuth.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret_string
```

#### 4. Create GitHub OAuth App
1. Go to [GitHub Developer Settings](https://github.com/settings/applications/new)
2. Set **Application name**: Text Management App
3. Set **Homepage URL**: `http://localhost:3000`
4. Set **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
5. Copy the **Client ID** and **Client Secret** to your `.env.local`

#### 5. Generate GitHub Personal Access Token
1. Go to [GitHub Token Settings](https://github.com/settings/tokens)
2. Generate new token with `repo` scope for your content repository
3. Copy the token to your `.env.local`

#### 6. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and sign in with GitHub!

## 🔧 Development

### Repository Structure

```
arrgh-collect/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # NextAuth.js authentication
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts
│   │   │   ├── files/         # File management endpoints
│   │   │   │   ├── [filename]/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── create/
│   │   │   │   │   └── route.ts
│   │   │   │   └── list/
│   │   │   │       └── route.ts
│   │   │   ├── repo/
│   │   │   │   └── route.ts
│   │   │   └── test-session/
│   │   │       └── route.ts
│   │   ├── dashboard/         # Main application interface
│   │   │   └── page.tsx
│   │   ├── test-editor/       # Editor testing page
│   │   │   └── page.tsx
│   │   ├── layout.tsx         # Root layout with providers
│   │   ├── page.tsx           # Landing page with GitHub login
│   │   ├── globals.css        # Global styles
│   │   └── favicon.ico
│   ├── components/            # Reusable React components
│   │   ├── CreateFileModal.tsx # New file creation modal
│   │   ├── FileList.tsx       # Repository file browser with resizable sidebar
│   │   ├── FrontmatterForm.tsx # YAML metadata form
│   │   ├── LoadingSpinner.tsx # Loading state components
│   │   ├── MarkdownEditor.tsx # MDX editor with frontmatter
│   │   ├── Providers.tsx      # NextAuth session provider
│   │   ├── SimpleMarkdownEditor.tsx # Basic markdown editor
│   │   ├── TestEditor.tsx     # Editor testing component
│   │   └── Toast.tsx          # Toast notification system
│   ├── lib/                   # Utility libraries
│   │   ├── auth.ts           # NextAuth configuration
│   │   └── github.ts         # GitHub API client with Git Tree API
│   ├── types/                 # TypeScript definitions
│   │   └── index.ts
│   └── styles/                # Additional styling
├── docs/                      # Documentation
│   └── projects/
│       └── PRDs/
│           └── text_management_prd.md
├── public/                    # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── config.json               # Application configuration
├── package.json              # Node.js 20.x dependencies and scripts
├── next.config.ts            # Next.js configuration
├── tsconfig.json             # TypeScript configuration
├── CLAUDE.md                 # Development guidance for Claude Code
└── README.md                 # Project documentation
```

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Custom Commands

This repository does not currently define any custom Claude Code commands. All development is done using standard npm scripts and git workflows.

## 🚀 Deployment

This project is deployed on Google Cloud Run using buildpacks for automatic containerization.

### Prerequisites for Deployment

```bash
# Enable required APIs
gcloud services enable run.googleapis.com cloudbuild.googleapis.com
```

### Deploy to Cloud Run

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

### Live Application

- **Production URL**: https://arrgh-collect-860937201650.us-central1.run.app
- **Deployment**: Automatic builds with buildpacks
- **Scaling**: Managed by Cloud Run

## 📊 Cost Estimation

- **Development**: Free (local development)
- **Low Traffic**: ~$1-5/month (Cloud Run pay-per-use)
- **Moderate Traffic**: ~$5-15/month

See [Cloud Run Pricing](https://cloud.google.com/run/pricing) for detailed information.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting: `npm run lint`
5. Test build: `npm run build`
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- [Live Demo](https://arrgh-collect-860937201650.us-central1.run.app)
- [GitHub Repository](https://github.com/Paul-Bonneville-Labs/arrgh-collect)
- [Google Cloud Run Documentation](https://cloud.google.com/run/docs)
