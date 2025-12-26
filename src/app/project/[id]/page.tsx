import { sites, getSiteById, categoryInfo, Site } from '@/config/sites';
import ProjectPageClient from './ProjectPageClient';
import { notFound } from 'next/navigation';

// Generate static pages for all sites at build time
export function generateStaticParams() {
    return sites.map((site) => ({
        id: site.id,
    }));
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const site = getSiteById(id);

    if (!site) {
        notFound();
    }

    const category = categoryInfo[site.category];

    return <ProjectPageClient site={site} category={category} />;
}
