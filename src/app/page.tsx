'use client';

import { useState } from 'react';
import Link from 'next/link';
import { sites, categoryInfo, Category, getSitesByCategory, searchSites, getFeaturedSites } from '@/config/sites';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');

  const categories = Object.keys(categoryInfo) as Category[];

  const filteredSites = searchQuery
    ? searchSites(searchQuery)
    : activeCategory === 'all'
      ? sites
      : getSitesByCategory(activeCategory);

  const featuredSites = getFeaturedSites();
  const totalProjects = sites.length;
  const totalCategories = new Set(sites.map(s => s.category)).size;

  return (
    <div className="min-h-screen grid-pattern noise-overlay">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-6">
        {/* Background Glow Effects */}
        <div className="hero-glow top-0 left-1/4 opacity-50" />
        <div className="hero-glow top-1/4 right-0 opacity-30" style={{ background: 'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.15) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-[rgba(99,102,241,0.1)] text-[#818cf8] border border-[rgba(99,102,241,0.2)] mb-6">
              📊 Data Analysis Portfolio
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <span className="gradient-text">Data Insights</span>
            <br />
            <span className="text-[var(--color-text-primary)]">Visualized</span>
          </h1>

          <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            A curated collection of data analysis projects featuring interactive visualizations,
            machine learning models, and insights from diverse datasets.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="stat-card">
              <div className="number">{totalProjects}</div>
              <div className="label">Projects</div>
            </div>
            <div className="stat-card">
              <div className="number">{totalCategories}</div>
              <div className="label">Categories</div>
            </div>
            <div className="stat-card">
              <div className="number">∞</div>
              <div className="label">Insights</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      {featuredSites.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <span className="text-2xl">⭐</span>
              Featured Projects
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredSites.slice(0, 3).map((site, index) => (
                <Link
                  key={site.id}
                  href={`/project/${site.id}`}
                  className="site-card group block animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-48 bg-gradient-to-br from-[var(--color-bg-tertiary)] to-[var(--color-bg-secondary)] flex items-center justify-center">
                    <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                      {categoryInfo[site.category].icon}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-card)] to-transparent" />
                  </div>

                  <div className="p-6">
                    <div className="mb-3">
                      <span
                        className="category-badge"
                        style={{ borderColor: categoryInfo[site.category].color + '40', color: categoryInfo[site.category].color }}
                      >
                        {categoryInfo[site.category].icon} {categoryInfo[site.category].label}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold mb-2 group-hover:text-[var(--color-primary-light)] transition-colors">
                      {site.name}
                    </h3>

                    <p className="text-[var(--color-text-secondary)] text-sm mb-4 line-clamp-2">
                      {site.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {site.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="tag-pill">{tag}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Projects Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">All Projects</h2>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input pl-12"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
              >
                All
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                >
                  {categoryInfo[category].icon} {categoryInfo[category].label}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSites.map((site, index) => (
              <Link
                key={site.id}
                href={`/project/${site.id}`}
                className="site-card group block animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative h-40 bg-gradient-to-br from-[var(--color-bg-tertiary)] to-[var(--color-bg-secondary)] flex items-center justify-center overflow-hidden">
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                    {categoryInfo[site.category].icon}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-card)] to-transparent" />
                </div>

                <div className="p-5">
                  <div className="mb-2">
                    <span
                      className="category-badge text-xs"
                      style={{ borderColor: categoryInfo[site.category].color + '40', color: categoryInfo[site.category].color }}
                    >
                      {categoryInfo[site.category].icon} {categoryInfo[site.category].label}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold mb-2 group-hover:text-[var(--color-primary-light)] transition-colors">
                    {site.name}
                  </h3>

                  <p className="text-[var(--color-text-secondary)] text-sm mb-3 line-clamp-2">
                    {site.description}
                  </p>

                  {site.dataSource && (
                    <p className="text-xs text-[var(--color-text-muted)]">
                      Source: {site.dataSource}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {filteredSites.length === 0 && (
            <div className="text-center py-16">
              <span className="text-6xl mb-4 block">🔍</span>
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p className="text-[var(--color-text-secondary)]">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[var(--color-text-secondary)]">
            Built with Next.js • Data visualizations • Interactive insights
          </p>
          <p className="text-[var(--color-text-muted)] text-sm mt-2">
            © {new Date().getFullYear()} Data Analysis Hub
          </p>
        </div>
      </footer>
    </div>
  );
}
