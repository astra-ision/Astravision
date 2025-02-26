import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Features from "@/components/home/Features";
import GlobalPresence from "@/components/home/GlobalPresence";
import CaseStudies from "@/components/home/CaseStudies";
import Testimonials from "@/components/home/Testimonials";
import Contact from "@/components/home/Contact";
import LaunchAnnouncement from "@/components/home/LaunchAnnouncement";
import Stats from "@/components/home/Stats";
import EnterpriseSolutions from "@/components/home/EnterpriseSolutions";
import TechStack from "@/components/home/TechStack";
import InnovationTimeline from "@/components/home/InnovationTimeline";
import Team from "@/components/home/Team";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <LaunchAnnouncement />
        <Hero />
        <Stats />
        <Services />
        <EnterpriseSolutions />
        <Features />
        <TechStack />
        <Team />
        <GlobalPresence />
        <InnovationTimeline />
        <CaseStudies />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
