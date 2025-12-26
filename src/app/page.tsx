'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { sites, categoryInfo, Category, getSitesByCategory, searchSites, getFeaturedSites } from '@/config/sites';
import { SiteThumbnail } from '@/components/SiteThumbnail';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [isScrolled, setIsScrolled] = useState(false);

  const categories = Object.keys(categoryInfo) as Category[];

  const filteredSites = searchQuery
    ? searchSites(searchQuery)
    : activeCategory === 'all'
      ? sites
      : getSitesByCategory(activeCategory);

  const featuredSites = getFeaturedSites();
  const totalProjects = sites.length;
  const totalCategories = new Set(sites.map(s => s.category)).size;

  // Restore scroll position
  useEffect(() => {
    const savedPosition = sessionStorage.getItem('homeScrollPosition');
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition, 10));
      sessionStorage.removeItem('homeScrollPosition');
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleProjectClick = () => {
    sessionStorage.setItem('homeScrollPosition', window.scrollY.toString());
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className={`nav-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a
            href="https://github.com/Ericdataplus"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-lg font-semibold tracking-tight hover:text-[var(--color-accent-primary)] transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Ericdataplus
          </a>
          <div className="flex items-center gap-6">
            <span className="text-caption">{totalProjects} Projects</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        {/* Background Effects */}
        <div className="hero-background">
          <div className="hero-gradient-orb hero-gradient-orb-1" />
          <div className="hero-gradient-orb hero-gradient-orb-2" />
          <div className="hero-grid" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Tag */}
          <div className="animate-fade-up" style={{ animationDelay: '0s' }}>
            <span className="category-badge mb-8 inline-flex">
              <span>📊</span>
              <span>Data Analysis Portfolio</span>
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-display mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <span className="gradient-text">Insights</span>
            <br />
            <span className="gradient-text-accent">Visualized</span>
          </h1>

          {/* Subtitle */}
          <p className="text-body max-w-2xl mx-auto mb-16 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            A curated collection of data analysis projects featuring interactive
            visualizations, machine learning models, and insights from diverse datasets.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="stat-card">
              <div className="stat-number">{totalProjects}</div>
              <div className="stat-label">Projects</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{totalCategories}</div>
              <div className="stat-label">Categories</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">∞</div>
              <div className="stat-label">Insights</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredSites.length > 0 && (
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="section-header animate-fade-up">
              <h2 className="text-headline">Featured</h2>
              <div className="section-line" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredSites.slice(0, 3).map((site, index) => (
                <Link
                  key={site.id}
                  href={`/project/${site.id}`}
                  onClick={handleProjectClick}
                  className="project-card group block animate-fade-up"
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                >
                  <div className="project-card-image h-52">
                    <SiteThumbnail
                      siteId={site.id}
                      url={site.url}
                      name={site.name}
                      fallbackIcon={categoryInfo[site.category].icon}
                      className="h-full project-card-thumbnail"
                    />
                  </div>

                  <div className="project-card-content">
                    <div className="mb-3">
                      <span
                        className="category-badge"
                        style={{
                          borderColor: categoryInfo[site.category].color + '30',
                          color: categoryInfo[site.category].color
                        }}
                      >
                        <span>{categoryInfo[site.category].icon}</span>
                        <span>{categoryInfo[site.category].label}</span>
                      </span>
                    </div>

                    <h3 className="project-card-title">{site.name}</h3>
                    <p className="project-card-description">{site.description}</p>

                    <div className="flex flex-wrap gap-2 mt-4">
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

      {/* All Projects */}
      <section className="py-24 px-6 bg-[var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <div className="section-header">
            <h2 className="text-headline">All Projects</h2>
            <div className="section-line" />
          </div>

          {/* Search and Filters */}
          <div className="mb-12 space-y-6">
            <div className="search-container">
              <svg className="search-icon w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
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
                onClick={handleProjectClick}
                className="project-card group block animate-fade-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="project-card-image h-44">
                  <SiteThumbnail
                    siteId={site.id}
                    url={site.url}
                    name={site.name}
                    fallbackIcon={categoryInfo[site.category].icon}
                    className="h-full project-card-thumbnail"
                  />
                </div>

                <div className="project-card-content">
                  <div className="mb-2">
                    <span
                      className="category-badge"
                      style={{
                        borderColor: categoryInfo[site.category].color + '30',
                        color: categoryInfo[site.category].color
                      }}
                    >
                      <span>{categoryInfo[site.category].icon}</span>
                      <span>{categoryInfo[site.category].label}</span>
                    </span>
                  </div>

                  <h3 className="project-card-title">{site.name}</h3>
                  <p className="project-card-description">{site.description}</p>

                  {site.dataSource && (
                    <p className="text-caption mt-3">
                      Source: {site.dataSource}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {filteredSites.length === 0 && (
            <div className="text-center py-24">
              <span className="text-6xl mb-6 block opacity-50">🔍</span>
              <h3 className="text-title mb-2">No projects found</h3>
              <p className="text-body">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">
          Built with Next.js — Data Analysis Portfolio
        </p>
        <p className="text-caption mt-2 opacity-50">
          © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
