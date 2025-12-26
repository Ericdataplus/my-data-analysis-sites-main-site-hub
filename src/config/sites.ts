// ============================================
// SITES CONFIGURATION
// ============================================
// To add a new site, simply add a new entry to the 'sites' array below.
// The hub will automatically display it in the catalog.
// ============================================

export type Category =
    | 'kaggle'
    | 'machine-learning'
    | 'space'
    | 'security'
    | 'entertainment'
    | 'finance'
    | 'other';

export interface Site {
    id: string;                    // Unique identifier (usually repo name)
    name: string;                  // Display name
    description: string;           // Short description
    url: string;                   // GitHub Pages URL
    repoUrl: string;               // GitHub repo URL
    category: Category;            // Category for filtering
    tags: string[];                // Tags for searching
    featured?: boolean;            // Show in featured section
    thumbnail?: string;            // Optional custom thumbnail path
    dataSource?: string;           // Where the data came from
    dateAdded: string;             // When it was added to the hub
    // New fields for insights
    keyInsight?: {                 // Standout statistic
        value: string;               // e.g., "91%", "48K"
        label: string;               // e.g., "Accuracy", "Listings"
    };
    datasetSize?: {                // Dataset size indicator
        value: string;               // e.g., "284K", "15K", "2.1GB"
        label: string;               // e.g., "rows", "records", "data"
    };
}

export const categoryInfo: Record<Category, { label: string; color: string; icon: string }> = {
    'kaggle': {
        label: 'Kaggle Dataset',
        color: '#20BEFF',
        icon: '📊'
    },
    'machine-learning': {
        label: 'Machine Learning',
        color: '#FF6B6B',
        icon: '🤖'
    },
    'space': {
        label: 'Space & Astronomy',
        color: '#9B59B6',
        icon: '🚀'
    },
    'security': {
        label: 'Cybersecurity',
        color: '#2ECC71',
        icon: '🔐'
    },
    'entertainment': {
        label: 'Entertainment',
        color: '#F39C12',
        icon: '🎵'
    },
    'finance': {
        label: 'Finance',
        color: '#1ABC9C',
        icon: '💰'
    },
    'other': {
        label: 'Other Projects',
        color: '#95A5A6',
        icon: '📁'
    },
};

// ============================================
// ADD YOUR SITES HERE
// ============================================
export const sites: Site[] = [
    {
        id: 'kaggle-airbnb-nyc',
        name: 'NYC Airbnb Market Analysis',
        description: 'Multi-dimensional analysis of NYC Airbnb listings with interactive visualizations exploring pricing, neighborhoods, and host patterns.',
        url: 'https://ericdataplus.github.io/kaggle-airbnb-nyc/',
        repoUrl: 'https://github.com/Ericdataplus/kaggle-airbnb-nyc',
        category: 'kaggle',
        tags: ['airbnb', 'nyc', 'real-estate', 'pricing', 'geographic'],
        featured: true,
        dataSource: 'Kaggle',
        dateAdded: '2024-01-01',
        keyInsight: { value: '$152', label: 'Avg Price' },
        datasetSize: { value: '48K', label: 'listings' },
    },
    {
        id: 'kaggle-books-dataset',
        name: 'Books Dataset Explorer',
        description: 'Interactive analysis of 15K+ books exploring ratings, authors, publishers, and literary trends over time.',
        url: 'https://ericdataplus.github.io/kaggle-books-dataset/',
        repoUrl: 'https://github.com/Ericdataplus/kaggle-books-dataset',
        category: 'kaggle',
        tags: ['books', 'literature', 'ratings', 'authors', 'publishers'],
        featured: true,
        dataSource: 'Kaggle',
        dateAdded: '2024-01-15',
        keyInsight: { value: '3.9★', label: 'Avg Rating' },
        datasetSize: { value: '15K', label: 'books' },
    },
    {
        id: 'kaggle-laptop-sales',
        name: 'Laptop Sales Analysis',
        description: 'Deep analysis of 4,400+ Amazon laptop listings examining specs, pricing, brands, and consumer preferences.',
        url: 'https://ericdataplus.github.io/kaggle-laptop-sales/',
        repoUrl: 'https://github.com/Ericdataplus/kaggle-laptop-sales',
        category: 'kaggle',
        tags: ['laptops', 'amazon', 'e-commerce', 'pricing', 'technology'],
        featured: true,
        dataSource: 'Kaggle',
        dateAdded: '2024-02-01',
        keyInsight: { value: '$847', label: 'Avg Price' },
        datasetSize: { value: '4.4K', label: 'laptops' },
    },
    {
        id: 'credit-card-fraud-detect',
        name: 'Credit Card Fraud Detection',
        description: 'ML fraud detection achieving 91%+ accuracy with interactive visualizations of model performance and fraud patterns.',
        url: 'https://ericdataplus.github.io/credit-card-fraud-detect/',
        repoUrl: 'https://github.com/Ericdataplus/credit-card-fraud-detect',
        category: 'machine-learning',
        tags: ['fraud', 'ml', 'classification', 'finance', 'security'],
        featured: true,
        dataSource: 'Kaggle',
        dateAdded: '2024-02-15',
        keyInsight: { value: '91%', label: 'Accuracy' },
        datasetSize: { value: '284K', label: 'transactions' },
    },
    {
        id: 'network-intrusion-detection',
        name: 'Network Intrusion Detection',
        description: 'AI-powered network intrusion detection system with visualizations of attack patterns and model predictions.',
        url: 'https://ericdataplus.github.io/network-intrusion-detection/',
        repoUrl: 'https://github.com/Ericdataplus/network-intrusion-detection',
        category: 'security',
        tags: ['cybersecurity', 'intrusion', 'network', 'ml', 'classification'],
        featured: false,
        dataSource: 'Kaggle',
        dateAdded: '2024-03-01',
        keyInsight: { value: '23', label: 'Attack Types' },
        datasetSize: { value: '125K', label: 'connections' },
    },
    {
        id: 'nasa-exoplanet-detection',
        name: 'NASA Exoplanet Discovery',
        description: 'Exploration of NASA exoplanet data with visualizations of planetary characteristics and detection methods.',
        url: 'https://ericdataplus.github.io/nasa-exoplanet-detection/',
        repoUrl: 'https://github.com/Ericdataplus/nasa-exoplanet-detection',
        category: 'space',
        tags: ['nasa', 'exoplanets', 'astronomy', 'space', 'kepler'],
        featured: true,
        dataSource: 'NASA',
        dateAdded: '2024-03-15',
        keyInsight: { value: '5K+', label: 'Exoplanets' },
        datasetSize: { value: '33K', label: 'observations' },
    },
    {
        id: 'ariel-atmosphere-kan',
        name: 'Ariel Atmosphere Analysis',
        description: 'Analysis of atmospheric data related to the Ariel space mission for exoplanet atmosphere characterization.',
        url: 'https://ericdataplus.github.io/ariel-atmosphere-kan/',
        repoUrl: 'https://github.com/Ericdataplus/ariel-atmosphere-kan',
        category: 'space',
        tags: ['ariel', 'atmosphere', 'exoplanets', 'spectroscopy'],
        featured: false,
        dataSource: 'ESA/Kaggle',
        dateAdded: '2024-04-01',
        keyInsight: { value: '1K', label: 'Targets' },
        datasetSize: { value: '52K', label: 'spectra' },
    },
    {
        id: 'random-artist-exploration',
        name: 'Random Artist Explorer',
        description: 'Interactive music data exploration tool for discovering and analyzing artist statistics and trends.',
        url: 'https://ericdataplus.github.io/random-artist-exploration/',
        repoUrl: 'https://github.com/Ericdataplus/random-artist-exploration',
        category: 'entertainment',
        tags: ['music', 'artists', 'spotify', 'streaming', 'discovery'],
        featured: false,
        dataSource: 'Spotify API',
        dateAdded: '2024-04-15',
        keyInsight: { value: '10K+', label: 'Artists' },
        datasetSize: { value: 'Live', label: 'API' },
    },
    {
        id: 'charity-protocol',
        name: 'Charity Protocol',
        description: 'Data-driven analysis of charitable organizations and giving patterns.',
        url: 'https://ericdataplus.github.io/charity-protocol/',
        repoUrl: 'https://github.com/Ericdataplus/charity-protocol',
        category: 'finance',
        tags: ['charity', 'nonprofit', 'donations', 'social-impact'],
        featured: false,
        dataSource: 'Various',
        dateAdded: '2024-05-01',
        keyInsight: { value: '$2.1B', label: 'Tracked' },
        datasetSize: { value: '8K', label: 'charities' },
    },
    {
        id: 'typing-game-site',
        name: 'Typing Speed Game',
        description: 'Prestige-like typing game to test and improve your typing speed with progression mechanics.',
        url: 'https://ericdataplus.github.io/typing-game-site/',
        repoUrl: 'https://github.com/Ericdataplus/typing-game-site',
        category: 'other',
        tags: ['game', 'typing', 'speed', 'practice', 'interactive'],
        featured: false,
        dataSource: 'N/A',
        dateAdded: '2024-05-15',
        keyInsight: { value: '150+', label: 'WPM Goal' },
        datasetSize: { value: '1K', label: 'words' },
    },
];

// Helper functions
export function getSitesByCategory(category: Category): Site[] {
    return sites.filter(site => site.category === category);
}

export function getFeaturedSites(): Site[] {
    return sites.filter(site => site.featured);
}

export function searchSites(query: string): Site[] {
    const lowerQuery = query.toLowerCase();
    return sites.filter(site =>
        site.name.toLowerCase().includes(lowerQuery) ||
        site.description.toLowerCase().includes(lowerQuery) ||
        site.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
}

export function getSiteById(id: string): Site | undefined {
    return sites.find(site => site.id === id);
}
