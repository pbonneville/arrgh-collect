# Arrgh Collect

A modern collection management platform built with Next.js and deployed on Google Cloud Run.

## 🚀 Features

- **Organize Collections**: Intuitive tools for categorizing and managing items
- **Track Progress**: Detailed analytics and insights for collection growth
- **Secure Storage**: Enterprise-grade security with cloud backend
- **Responsive Design**: Beautiful UI with Tailwind CSS and dark mode support

## 🛠 Tech Stack

- **Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **Hosting**: Google Cloud Run with Buildpacks
- **Runtime**: Node.js 20.x
- **Build System**: Buildpacks (automatic containerization)

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 20+
- Google Cloud CLI (for deployment)
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Paul-Bonneville-Labs/arrgh-collect.git
cd arrgh-collect
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🔧 Development

### Repository Structure

```
arrgh-collect/
├── src/
│   └── app/                    # Next.js App Router
│       ├── layout.tsx         # Root layout with metadata and fonts
│       ├── page.tsx           # Landing page with feature preview
│       └── globals.css        # Global styles
├── public/                     # Static assets
├── package.json               # Node.js 20.x engine specification
├── next.config.ts             # Next.js configuration
├── tsconfig.json              # TypeScript configuration
├── CLAUDE.md                  # Development guidance
└── README.md                  # Project documentation
```

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

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
