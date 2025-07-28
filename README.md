# 📝 Lambda DynamoDB UI

This is a simple React + Tailwind frontend to interact with the [lambda-dynamodb-infra](https://github.com/your-username/lambda-dynamodb-infra) serverless API.

## 🔗 Live Demo

**GitHub Pages:** [lambda-dynamodb-ui](https://your-username.github.io/lambda-dynamodb-ui/)

## ✅ Features

- 📄 Create, view, edit, and delete notes
- ⚙️ Connects to a deployed AWS Lambda API Gateway backend
- 🧪 Built with Vite + React + TypeScript
- 💨 Styled with Tailwind CSS v4
- 🧵 Minimal components structure
- ☁️ Deployed via GitHub Actions to GitHub Pages

## 📁 Project Structure

```bash
lambda-dynamodb-ui/
├── public/
├── src/
│   ├── components/
│   │   ├── AddNote.tsx
│   │   └── NoteItem.tsx
│   ├── services/
│   │   └── api.ts
│   ├── App.tsx
│   └── main.tsx
├── .env               # Not committed – add VITE_API_URL
├── tailwind.config.ts
├── postcss.config.js
├── vite.config.ts
├── package.json
└── README.md
```

## 🧪 Local Development

1. **Clone the repo**

```bash
git clone https://github.com/your-username/lambda-dynamodb-ui.git
cd lambda-dynamodb-ui
```

2. **Create a .env file**

```env
VITE_API_URL=<YOUR_AWS_API_ENDPOINT>
```

3. **Install dependencies**

```bash
npm install
```

2. **Create a .env file**

```bash
npm run dev
```

## 🚀 Deploying to GitHub Pages

The project uses peaceiris/actions-gh-pages to build and deploy from main to gh-pages.

## 🔐 GitHub Actions Secrets

Set this in your repo settings under Settings > Secrets and variables > Actions:

- VITE_API_URL – same value as your .env file

GitHub Actions will use this for your production build

## ✅ GitHub Actions Workflow

`.github/workflows/publish-docs.yml`

Built with ❤️ by Victor Fajardo
Backend Repo → [lambda-dynamodb-infra](https://github.com/VictorFajardo/lambda-dynamodb-infra)