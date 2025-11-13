# 🚀 Portfolio Website

Welcome to my personal portfolio website built with **React**, **TypeScript**, **Tailwind CSS**, and **Vite**.

## ✨ Features

- 🎨 **Dark/Light Mode Toggle** - Seamless theme switching with system preference support
- 🌍 **Internationalization (i18n)** - English & Vietnamese language support
- 📱 **Responsive Design** - Mobile-friendly layout
- ⚡ **Fast Development** - Powered by Vite for instant HMR
- 🎭 **Smooth Animations** - Intersection Observer & CSS animations
- 📊 **Visitor Counter** - Real-time visitor tracking via CountAPI

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript
- **Styling:** Tailwind CSS + PostCSS
- **Build Tool:** Vite
- **Routing:** React Router v6
- **Animations:** React Spring, CSS Animations
- **Internationalization:** i18next + react-i18next
- **Icons:** Lucide React
- **Linting:** ESLint

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/NTH2k4/my_portfolio.git
   cd my_portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## 🚀 Getting Started

### Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

## 📁 Project Structure

```
src/
├── assets/           # Images & static files
│   ├── flags/       # Language flags
│   ├── portrait/    # Profile images
│   └── slides/      # Carousel images
├── locales/         # Translation files
│   ├── en.json      # English
│   └── vi.json      # Vietnamese
├── App.tsx          # Main component
├── Home.tsx         # Home page
├── ThemeContext.tsx # Theme management
├── ThemeToggle.tsx  # Theme toggle button
├── i18n.ts          # i18n configuration
└── index.css        # Global styles
```

## 🌐 Deployment

The project can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

## 🔧 Environment Variables

Create `.env.local` if needed:
```
VITE_API_KEY=your_api_key
```

## 📝 License

This project is private and owned by Beater (NTH2k4).

## 📧 Contact

- **GitHub:** [NTH2k4](https://github.com/NTH2k4)
- **LinkedIn:** [Beater](https://www.linkedin.com/in/beater/)
- **Email:** trunghieu14092004@gmail.com
