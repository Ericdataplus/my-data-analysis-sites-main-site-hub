'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Site } from '@/config/sites';

interface CategoryData {
    label: string;
    color: string;
    icon: string;
}

interface ProjectPageClientProps {
    site: Site;
    category: CategoryData;
}

export default function ProjectPageClient({ site, category }: ProjectPageClientProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'iframe' | 'external'>('iframe');

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header Bar */}
            <header className="glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="hidden sm:inline">Back to Catalog</span>
                    </Link>

                    <div className="h-6 w-px bg-[var(--color-border)]" />

                    <div className="flex items-center gap-3">
                        <span
                            className="category-badge"
                            style={{ borderColor: category.color + '40', color: category.color }}
                        >
                            {category.icon} {category.label}
                        </span>
                        <h1 className="text-lg font-semibold truncate max-w-xs sm:max-w-md">
                            {site.name}
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* View Mode Toggle */}
                    <div className="hidden sm:flex items-center gap-1 bg-[var(--color-bg-secondary)] rounded-lg p-1">
                        <button
                            onClick={() => setViewMode('iframe')}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'iframe'
                                    ? 'bg-[var(--color-accent-primary)] text-white'
                                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                                }`}
                        >
                            Embedded
                        </button>
                        <button
                            onClick={() => setViewMode('external')}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'external'
                                    ? 'bg-[var(--color-accent-primary)] text-white'
                                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                                }`}
                        >
                            Info
                        </button>
                    </div>

                    <a
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="filter-btn flex items-center gap-2 text-sm"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <span className="hidden sm:inline">Open Full</span>
                    </a>

                    <a
                        href={site.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="filter-btn flex items-center gap-2 text-sm"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        <span className="hidden sm:inline">GitHub</span>
                    </a>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-4">
                {viewMode === 'iframe' ? (
                    <div className="iframe-container relative">
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-bg-secondary)]">
                                <div className="text-center">
                                    <div className="inline-block w-12 h-12 border-4 border-[var(--color-accent-primary)] border-t-transparent rounded-full animate-spin mb-4" />
                                    <p className="text-[var(--color-text-secondary)]">Loading project...</p>
                                </div>
                            </div>
                        )}
                        <iframe
                            src={site.url}
                            title={site.name}
                            onLoad={() => setIsLoading(false)}
                            className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}
                        />
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto py-8">
                        <div className="project-card p-8">
                            <div className="flex items-start gap-6 mb-8">
                                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[var(--color-bg-tertiary)] to-[var(--color-bg-secondary)] flex items-center justify-center text-5xl">
                                    {category.icon}
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-3xl font-bold mb-2">{site.name}</h2>
                                    <p className="text-[var(--color-text-secondary)] text-lg mb-4">
                                        {site.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {site.tags.map(tag => (
                                            <span key={tag} className="tag-pill">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6 mb-8">
                                <div className="p-4 rounded-xl bg-[var(--color-bg-secondary)]">
                                    <p className="text-sm text-[var(--color-text-muted)] mb-1">Category</p>
                                    <p className="font-medium" style={{ color: category.color }}>
                                        {category.icon} {category.label}
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl bg-[var(--color-bg-secondary)]">
                                    <p className="text-sm text-[var(--color-text-muted)] mb-1">Data Source</p>
                                    <p className="font-medium">{site.dataSource || 'N/A'}</p>
                                </div>
                                <div className="p-4 rounded-xl bg-[var(--color-bg-secondary)]">
                                    <p className="text-sm text-[var(--color-text-muted)] mb-1">Added</p>
                                    <p className="font-medium">{new Date(site.dateAdded).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                                <div className="p-4 rounded-xl bg-[var(--color-bg-secondary)]">
                                    <p className="text-sm text-[var(--color-text-muted)] mb-1">Project ID</p>
                                    <p className="font-medium font-mono text-sm">{site.id}</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <a
                                    href={site.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="filter-btn active flex items-center gap-2"
                                >
                                    View Live Project
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                                <a
                                    href={site.repoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="filter-btn flex items-center gap-2"
                                >
                                    View Source Code
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
