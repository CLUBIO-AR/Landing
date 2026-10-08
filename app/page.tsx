import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ParaQuien } from "@/components/ParaQuien";
import { Problema } from "@/components/Problema";
import { ComoFunciona } from "@/components/ComoFunciona";
import { Funciones } from "@/components/Funciones";
import { DemoVideo } from "@/components/DemoVideo";
import { Diferenciadores } from "@/components/Diferenciadores";
import { Planes } from "@/components/Planes";
import { Preguntas } from "@/components/Preguntas";
import { FormDemo } from "@/components/FormDemo";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ParaQuien />
        <Problema />
        <Funciones />
        <ComoFunciona />
        <DemoVideo />
        <Diferenciadores />
        <Planes />
        <Preguntas />
        <FormDemo />
      </main>
      <Footer />
    </>
  );
}
