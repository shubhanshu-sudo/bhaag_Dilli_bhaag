import type { Metadata } from 'next';
import FAQPageContent from './FaqPageContent';

export const metadata: Metadata = {
    title: 'FAQ | Bhaag Dilli Bhaag Running Event',
    description: 'Find answers to frequently asked questions about Bhaag Dilli Bhaag 2026. Important information regarding registration, bib collection, and race day.',
    alternates: {
        canonical: 'https://www.bhaagdillibhaag.in/faq',
    },
    openGraph: {
        title: 'FAQ | Bhaag Dilli Bhaag Running Event',
        description: 'Have questions? We have answers. Everything about Bhaag Dilli Bhaag 2026.',
        url: 'https://www.bhaagdillibhaag.in/faq',
    },
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What is Bhaag Dilli Bhaag?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Bhaag Dilli Bhaag is a charity marathon organised by Delhi Amigos around Table 313. It brings together runners, families, and communities to support the larger cause of Freedom Through Education and create meaningful social impact through participation."
            }
        },
        {
            "@type": "Question",
            "name": "When and where will the event take place?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The event will be held in Delhi on the announced race date. The exact venue, reporting time, and route details will be shared with registered participants closer to race day."
            }
        },
        {
            "@type": "Question",
            "name": "What are the race categories?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Bhaag Dilli Bhaag offers multiple categories to welcome runners of all levels: 2 KM Fun Run, 5 KM Timed Run, and 10 KM Timed Run. Each category is designed to encourage participation, fitness, and purpose."
            }
        },
        {
            "@type": "Question",
            "name": "How can I register for the event?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Registrations can be completed online through the official registration partner. The registration link is available on this website. Payments can be made using cards, net banking, or supported digital wallets."
            }
        },
        {
            "@type": "Question",
            "name": "What does my registration include?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Your registration includes: Official race bib with timing chip (for timed categories), Race day dry-fit T-shirt, Finisher medal, Hydration and medical support on route, Post-run breakfast, E-certificate, and Professional race day photos."
            }
        }
    ]
};

export default function FAQPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <FAQPageContent />
        </>
    );
}
