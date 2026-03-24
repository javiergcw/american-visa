export default function Privacidad() {
  return (
    <section id="privacidad" className="section-y bg-muted">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Política de privacidad</h2>
        <p className="mt-2 text-sm text-slate-600">Última actualización: {new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-700">
          <p>
            <strong className="text-ink">American Visa Technology S.A.S</strong> (en adelante, &quot;la Empresa&quot;) es el
            responsable del tratamiento de los datos personales que usted nos suministre a través de este sitio web, correo
            electrónico, WhatsApp o formularios de contacto.
          </p>
          <p>
            Los datos que solicitemos (por ejemplo: nombre, teléfono, correo y descripción de su necesidad) se utilizan
            únicamente para <strong className="text-ink">contactarle, cotizar servicios, dar soporte comercial y mejorar
            nuestra atención</strong>. No vendemos ni cedemos sus datos a terceros para fines ajenos a esta finalidad,
            salvo obligación legal o requerimiento de autoridad competente.
          </p>
          <p>
            Usted puede ejercer sus derechos de conocer, actualizar, rectificar y suprimir sus datos, y revocar la
            autorización, conforme a la normativa colombiana aplicable (incluida la Ley 1581 de 2012 y el Decreto 1377 de
            2013), escribiendo a{' '}
            <a href="mailto:tecnologia@grupoamericanvisa.com" className="font-medium text-brand underline-offset-2 hover:underline">
              tecnologia@grupoamericanvisa.com
            </a>
            .
          </p>
          <p>
            Este sitio puede utilizar cookies técnicas o de medición básica. Puede configurar su navegador para
            rechazarlas; algunas funciones podrían verse limitadas.
          </p>
          <p className="text-xs text-slate-600">
            Este texto es una plantilla informativa. Revíselo con asesoría legal para adaptarlo a su operación y canales de
            tratamiento de datos.
          </p>
        </div>
      </div>
    </section>
  )
}
