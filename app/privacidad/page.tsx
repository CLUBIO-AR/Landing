import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Cómo CLUBIO recopila, usa y protege los datos personales de gimnasios, alumnos y visitantes.",
  alternates: { canonical: "https://clubio.com.ar/privacidad" },
};

const ACTUALIZACION = "7 de octubre de 2026";
const CONTACTO = "contacto@clubio.com.ar";

function Seccion({ id, titulo, children }: { id?: string; titulo: string; children: React.ReactNode }) {
  return (
    <section id={id} className="flex flex-col gap-3 scroll-mt-24">
      <h2 className="font-display text-xl sm:text-2xl uppercase text-white">{titulo}</h2>
      <div className="flex flex-col gap-3 text-gray-lt leading-relaxed">{children}</div>
    </section>
  );
}

export default function Privacidad() {
  return (
    <>
      <Navbar />
      <main className="bg-dark">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 flex flex-col gap-10">
          <header className="flex flex-col gap-3">
            <h1 className="font-display text-3xl sm:text-4xl uppercase text-white">Política de privacidad</h1>
            <p className="text-sm text-gray">Última actualización: {ACTUALIZACION}</p>
            <p className="text-gray-lt leading-relaxed">
              CLUBIO es un sistema de gestión y cobro de cuotas para gimnasios. Esta política explica qué
              datos personales tratamos, para qué, con quién los compartimos y cómo podés ejercer tus
              derechos. Aplica al sitio clubio.com.ar, a la aplicación app.clubio.com.ar y a los mensajes
              que enviamos por email y WhatsApp.
            </p>
          </header>

          <Seccion titulo="1. Quiénes somos y nuestro rol">
            <p>
              Para los datos del sitio y de los gimnasios que contratan el servicio, CLUBIO es responsable
              del tratamiento.
            </p>
            <p>
              Para los datos de los alumnos, el responsable es cada gimnasio, que los carga y decide cómo
              usarlos. CLUBIO los trata por cuenta y orden del gimnasio, solo para prestarle el servicio.
              Si sos alumno, podés dirigir tus consultas a tu gimnasio o escribirnos a {CONTACTO}.
            </p>
          </Seccion>

          <Seccion titulo="2. Qué datos tratamos">
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>
                <strong className="text-white">Formulario de demo:</strong> nombre, email, teléfono, nombre
                del gimnasio, cantidad aproximada de alumnos, cómo nos conociste y la dirección IP desde
                donde se envió.
              </li>
              <li>
                <strong className="text-white">Gimnasios y sus usuarios:</strong> datos del gimnasio,
                nombre y email de los administradores, configuración de cobro y datos de facturación de la
                suscripción.
              </li>
              <li>
                <strong className="text-white">Alumnos:</strong> nombre, apellido, DNI (opcional),
                teléfono, email, actividades, cuotas, pagos y notas que cargue el gimnasio.
              </li>
              <li>
                <strong className="text-white">Mensajes de WhatsApp:</strong> número de teléfono, contenido
                de los mensajes enviados y recibidos, y su estado de entrega.
              </li>
              <li>
                <strong className="text-white">Pagos:</strong> los pagos se procesan en Mercado Pago. CLUBIO
                no recibe ni guarda datos de tarjetas; solo el identificador, el monto y el estado del pago.
              </li>
            </ul>
          </Seccion>

          <Seccion titulo="3. Para qué los usamos">
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>Responder pedidos de demo y consultas.</li>
              <li>Generar cuotas, enviar avisos de vencimiento y links de pago, y registrar pagos.</li>
              <li>Responder mensajes de WhatsApp, incluido el asistente automático del gimnasio.</li>
              <li>Facturar la suscripción de CLUBIO a cada gimnasio.</li>
              <li>Mantener la seguridad del servicio y cumplir obligaciones legales.</li>
            </ul>
            <p>No vendemos datos personales ni los usamos para publicidad de terceros.</p>
          </Seccion>

          <Seccion titulo="4. Con quién los compartimos">
            <p>Solo con los proveedores que necesitamos para prestar el servicio:</p>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>Supabase (base de datos y autenticación).</li>
              <li>Vercel (alojamiento de la aplicación).</li>
              <li>Resend (envío de emails).</li>
              <li>Meta Platforms (WhatsApp Business Cloud API, para enviar y recibir mensajes).</li>
              <li>Mercado Pago (procesamiento de pagos).</li>
            </ul>
            <p>
              Algunos de estos proveedores almacenan datos fuera de Argentina. Trabajamos con empresas que
              aplican medidas de seguridad adecuadas. También podemos compartir datos si lo exige una
              autoridad competente.
            </p>
          </Seccion>

          <Seccion titulo="5. Cuánto tiempo los guardamos">
            <p>
              Mientras el gimnasio tenga el servicio activo y el tiempo necesario para cumplir obligaciones
              legales y contables. Los datos de demos que no se convierten en clientes se eliminan a pedido.
            </p>
          </Seccion>

          <Seccion titulo="6. Seguridad">
            <p>
              Los datos de cada gimnasio están aislados del resto, el acceso requiere usuario y contraseña,
              las comunicaciones viajan cifradas y las credenciales de pago y mensajería se guardan del lado
              del servidor.
            </p>
          </Seccion>

          <Seccion id="tus-derechos" titulo="7. Tus derechos">
            <p>
              Podés pedir acceso, rectificación, actualización o supresión de tus datos, y oponerte a recibir
              mensajes. Para dejar de recibir WhatsApp de tu gimnasio, respondé &quot;BAJA&quot; o pedíselo
              al gimnasio.
            </p>
            <p>
              Conforme a la Ley 25.326 de Protección de Datos Personales, el titular puede ejercer el
              derecho de acceso en forma gratuita a intervalos no inferiores a seis meses, salvo interés
              legítimo. La Agencia de Acceso a la Información Pública es la autoridad de control y atiende
              las denuncias por incumplimiento de las normas de protección de datos personales.
            </p>
          </Seccion>

          <Seccion id="eliminacion-de-datos" titulo="8. Cómo pedir la eliminación de tus datos">
            <ol className="list-decimal pl-5 flex flex-col gap-2">
              <li>
                Escribí a <a className="text-green hover:underline" href={`mailto:${CONTACTO}`}>{CONTACTO}</a>{" "}
                con el asunto &quot;Eliminar mis datos&quot;.
              </li>
              <li>Indicá tu nombre, el teléfono o email registrado y, si sos alumno, tu gimnasio.</li>
              <li>Confirmamos el pedido y eliminamos los datos dentro de los 10 días hábiles.</li>
            </ol>
            <p>
              Podemos conservar lo que la ley nos obligue a guardar, como registros contables de pagos.
            </p>
          </Seccion>

          <Seccion titulo="9. Cambios y contacto">
            <p>
              Si cambiamos esta política, actualizamos la fecha de arriba. Para cualquier consulta escribinos
              a <a className="text-green hover:underline" href={`mailto:${CONTACTO}`}>{CONTACTO}</a>.
            </p>
          </Seccion>
        </article>
      </main>
      <Footer />
    </>
  );
}
