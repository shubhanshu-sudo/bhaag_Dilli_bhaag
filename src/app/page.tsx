import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Benefits from '@/components/Benefits';
import RaceCategories from '@/components/RaceCategories';
import Route from '@/components/Route';
import Partners from '@/components/Partners';

export const metadata: Metadata = {
  title: 'Bhaag Dilli Bhaag 2026 | North Delhi\'s Biggest Running Event',
  description: 'Join North Delhi\'s premier running event on 1st March 2026 at Japanese Park, Rohini. Choose from 2K, 5K, or 10K races. Supporting Freedom Through Education initiative.',
  keywords: 'running event, marathon, Dilli, Rohini, Japanese Park, 2K run, 5K run, 10K run, fitness, charity run',
  openGraph: {
    title: 'Bhaag Dilli Bhaag 2026',
    description: 'North Delhi\'s Biggest Running Event - 1st March 2026',
    type: 'website',
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
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
