import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Ticker } from "@/components/site/ticker";
import { Showcase } from "@/components/site/showcase";
import { About } from "@/components/site/about";
import { Products } from "@/components/site/products";
import { Interactive3D } from "@/components/site/interactive-3d";
import { VideoSection } from "@/components/site/video-section";
import { Testimonials } from "@/components/site/testimonials";
import { Distributor } from "@/components/site/distributor";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { WholesaleDialog } from "@/components/site/wholesale-dialog";
import { WhatsappFab } from "@/components/site/whatsapp-fab";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { BackToTop } from "@/components/motion/back-to-top";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <Showcase />
        <About />
        <Products />
        <Interactive3D />
        <VideoSection />
        <Testimonials />
        <Distributor />
        <Contact />
      </main>
      <Footer />
      <WholesaleDialog />
      <WhatsappFab />
      <BackToTop />
    </>
  );
}
