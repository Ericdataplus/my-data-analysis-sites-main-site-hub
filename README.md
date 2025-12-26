# 📊 Data Insights Hub

<div align="center">

### **[🚀 View Live Site →](https://ericdataplus.github.io/my-data-analysis-sites-main-site-hub/)**

A curated portfolio showcasing interactive data analysis projects with visualizations, machine learning models, and insights from diverse datasets.

[![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-blue?style=for-the-badge&logo=github)](https://ericdataplus.github.io/my-data-analysis-sites-main-site-hub/)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)

</div>

---

## ✨ Features

- **10+ Data Analysis Projects** - From Kaggle datasets to NASA exoplanet data
- **Interactive Visualizations** - Explore each project through embedded previews
- **Key Insights Badges** - Standout stats highlighted on each project
- **Dataset Size Indicators** - See the scale of each analysis at a glance
- **Category Filtering** - Browse by Machine Learning, Space, Finance & more
- **Search** - Find projects by name, description, or tags
- **Instant Thumbnails** - Pre-generated optimized screenshots

## 🛠️ Tech Stack

- **Next.js 16** - React framework with static export
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **GitHub Pages** - Free hosting with automatic deployment
- **Playwright** - Automated screenshot generation

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
├── components/             # Reusable React components
├── config/
│   └── sites.ts           # ⭐ Add new projects here
public/
└── thumbnails/            # Optimized project screenshots
```

## ➕ Adding New Projects

1. Edit `src/config/sites.ts` and add a new entry:
```typescript
{
  id: 'your-project-id',
  name: 'Your Project Name',
  description: 'Brief description',
  url: 'https://ericdataplus.github.io/your-repo/',
  repoUrl: 'https://github.com/Ericdataplus/your-repo',
  category: 'kaggle', // or 'machine-learning', 'space', etc.
  tags: ['tag1', 'tag2'],
  keyInsight: { value: '95%', label: 'Accuracy' },
  datasetSize: { value: '50K', label: 'rows' },
  dateAdded: '2024-12-26',
}
```

2. Generate thumbnail:
```bash
npm run generate-thumbnails
npm run optimize-thumbnails
```

3. Commit and push - auto-deploys to GitHub Pages!

## 🚀 Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

<div align="center">

**[View Live Site](https://ericdataplus.github.io/my-data-analysis-sites-main-site-hub/)** · [Report Bug](https://github.com/Ericdataplus/my-data-analysis-sites-main-site-hub/issues)

</div>
