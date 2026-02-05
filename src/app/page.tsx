import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import VideoTeaser from '@/components/VideoTeaser';
import About from '@/components/About';
import Benefits from '@/components/Benefits';
import RaceCategories from '@/components/RaceCategories';
import Route from '@/components/Route';
import Partners from '@/components/Partners';

export const metadata: Metadata = {
  title: 'Bhaag Dilli Bhaag | Running Event for Education in Delhi',
  description: 'Bhaag Dilli Bhaag is a running event in Rohini, Delhi on 1st March. Run 2K, 5K or 10K—every step you take helps build classrooms and open doors for underprivileged children.',
  keywords: 'Bhaag Dilli Bhaag, Delhi Marathon, Running Event, Rohini Marathon, Charity Run, 2KM, 5KM, 10KM, Round Table India, RTI',
  alternates: {
    canonical: 'https://www.bhaagdillibhaag.in',
  },
  openGraph: {
    title: 'Bhaag Dilli Bhaag | Running Event for Education in Delhi',
    description: 'Bhaag Dilli Bhaag is a running event in Rohini, Delhi on 1st March. Every step helps children.',
    type: 'website',
    url: 'https://www.bhaagdillibhaag.in',
  },
};

const sportsEventSchema = {
  "@context": "https://schema.org",
  "@type": "SportsEvent",
  "name": "Bhaag Dilli Bhaag",
  "description": "Bhaag Dilli Bhaag is a charity marathon event for education in Delhi. 2K, 5K, and 10K categories.",
  "startDate": "2026-03-01T06:00:00+05:30",
  "location": {
    "@type": "Place",
    "name": "Metro Walk, Sector-10, Rohini",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Rohini",
      "addressRegion": "Delhi",
      "addressCountry": "IN"
    }
  },
  "offers": {
    "@type": "Offer",
    "url": "https://www.bhaagdillibhaag.in/register",
    "price": "499",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock"
  },
  "organizer": {
    "@type": "Organization",
    "name": "Round Table India (RTI)",
    "url": "https://www.roundtableindia.org"
  },
  "image": "https://www.bhaagdillibhaag.in/Untitled-1-01.webp"
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsEventSchema) }}
      />
      <Navbar />
      <main>
        <Hero />
        <VideoTeaser />
        <About />
        <Benefits />
        <RaceCategories />
        <Route />
        <Partners />
      </main>
      <Footer />
    </>
  );
}
