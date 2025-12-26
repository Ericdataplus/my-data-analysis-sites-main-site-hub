import { sites, getSiteById, categoryInfo } from '@/config/sites';
import ProjectPageClient from './ProjectPageClient';

// Generate static pages for all sites at build time
export function generateStaticParams() {
    return sites.map((site) => ({
        id: site.id,
    }));
}

export default function ProjectPage({ params }: { params: { id: string } }) {
    return <ProjectPageClient id={params.id} />;
}
