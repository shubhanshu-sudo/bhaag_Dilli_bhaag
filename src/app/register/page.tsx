import type { Metadata } from 'next';
import RegisterPageContent from './RegisterPageContent';

export const metadata: Metadata = {
    title: 'Register for Bhaag Dilli Bhaag | 2K, 5K & 10K Charity Run',
    description: 'Register now for Bhaag Dilli Bhaag charity running event in Delhi. Choose 2K, 5K or 10K and support education for underprivileged children.',
    keywords: 'Register Bhaag Dilli Bhaag, Marathon Registration Delhi, Charity Run Registration, Rohini Running Event',
    alternates: {
        canonical: 'https://www.bhaagdillibhaag.in/register',
    },
    openGraph: {
        title: 'Register for Bhaag Dilli Bhaag | 2K, 5K & 10K Charity Run',
        description: 'Join the race for education. Register for 2K, 5K, or 10K runs.',
        url: 'https://www.bhaagdillibhaag.in/register',
    },
};

const offerSchema = {
    "@context": "https://schema.org",
    "@type": "Offer",
    "name": "Bhaag Dilli Bhaag Registration",
    "description": "Registration for Bhaag Dilli Bhaag charity running event 2026.",
    "url": "https://www.bhaagdillibhaag.in/register",
    "price": "499",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock",
    "validFrom": "2026-02-01",
    "offeredBy": {
        "@type": "Organization",
        "name": "Bhaag Dilli Bhaag"
    }
};

export default function RegisterPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }}
            />
            <RegisterPageContent />;
        </>
    );
}
