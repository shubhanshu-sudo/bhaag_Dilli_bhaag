import type { Metadata } from 'next';
import MaintenancePage from './MaintenancePage';

export const metadata: Metadata = {
    title: 'Under Maintenance | Bhaag Dilli Bhaag',
    description:
        'Bhaag Dilli Bhaag website is currently under maintenance. We will be back shortly.',
    robots: {
        index: false,
        follow: false,
    },
};

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function Page() {
    return <MaintenancePage />;
}
