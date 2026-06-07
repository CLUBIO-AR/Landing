import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Problema } from "@/components/Problema";
import { ComoFunciona } from "@/components/ComoFunciona";
import { Diferenciadores } from "@/components/Diferenciadores";
import { Planes } from "@/components/Planes";
import { FormDemo } from "@/components/FormDemo";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problema />
        <ComoFunciona />
        <Diferenciadores />
        <Planes />
        <FormDemo />
      </main>
      <Footer />
    </>
  );
}
