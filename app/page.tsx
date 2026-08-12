import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
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

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
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
    </>
  );
}
