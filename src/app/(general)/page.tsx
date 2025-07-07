import Link from "next/link";

export default function Page() {
  return (
    <div className="antialiased">
      {/* Header Section */}
      <header className="bg-white shadow-sm py-4 sticky top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Navigation Links */}
          <nav className="flex items-center justify-center gap-4 w-full">
            <ul className="flex space-x-4">
              <li>
                <a
                  href="#inicio"
                  className="text-gray-600 hover:text-green-600 font-medium"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#nosotros"
                  className="text-gray-600 hover:text-green-600 font-medium"
                >
                  Nosotros
                </a>
              </li>
              <li>
                <a
                  href="#proceso"
                  className="text-gray-600 hover:text-green-600 font-medium"
                >
                  Proceso
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="inicio"
        className="relative bg-center h-screen flex items-center justify-center text-white"
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="container mx-auto px-4 text-center z-10 flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 animate-fade-in-down">
            Transformando Ideas en Realidad con{' '}
            <span className="text-green-400">Impresión 3D</span>
          </h2>
          <img src="/logo.png" alt="Logo" className="w-1/4 mb-4" />
          <p className="text-lg md:text-xl mb-8">
            En Topografía Especializada S.A., damos vida a tus proyectos con
            diseños innovadores y un compromiso firme con la sostenibilidad.
          </p>
          <Link
            href="/medallas"
            className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Ver Nuestras Creaciones 3D
          </Link>
        </div>
      </section>

      {/* About Us Section */}
      <section id="nosotros" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 relative">
            <span className="bg-gradient-to-r from-green-500 to-green-700 text-transparent bg-clip-text">
              Nuestro Equipo Innovador
            </span>
            <span className="block w-24 h-1 bg-green-500 mx-auto mt-2 rounded-full"></span>
          </h3>
          <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
            Somos Topografía Especializada S.A., una empresa familiar dedicada a
            la creación de piezas únicas mediante impresión 3D, fusionando la
            precisión técnica con la expresión artística.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Member 1: Eysbel A. Gomez C. */}
            <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center card">
              <img
                src="https://placehold.co/150x150/4CAF50/FFFFFF?text=Eysbel"
                alt="Foto de Eysbel A. Gomez C."
                className="w-36 h-36 rounded-full object-cover mb-6 border-4 border-green-400 shadow-md"
              />
              <h4 className="text-2xl font-semibold text-gray-900 mb-2">
                Eysbel A. Gomez C.
              </h4>
              <p className="text-green-600 font-medium mb-4">
                Co-fundadora & Diseñadora Principal
              </p>
              <p className="text-gray-600 text-center">
                Con una visión artística excepcional, Eysbel es la mente maestra
                detrás de nuestros diseños más creativos, transformando ideas en
                bocetos tangibles.
              </p>
            </div>

            {/* Member 2: Ricardo A. Sanjur A. */}
            <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center card">
              <img
                src="https://placehold.co/150x150/4CAF50/FFFFFF?text=Ricardo+A"
                alt="Foto de Ricardo A. Sanjur A."
                className="w-36 h-36 rounded-full object-cover mb-6 border-4 border-green-400 shadow-md"
              />
              <h4 className="text-2xl font-semibold text-gray-900 mb-2">
                Ricardo A. Sanjur A.
              </h4>
              <p className="text-green-600 font-medium mb-4">
                Co-fundador & Ingeniero de Impresión
              </p>
              <p className="text-gray-600 text-center">
                Ricardo aporta su experiencia técnica para asegurar la precisión
                y calidad en cada impresión, optimizando los procesos y la
                maquinaria.
              </p>
            </div>

            {/* Member 3: Ricardo A Sanjur G */}
            <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center card">
              <img
                src="https://placehold.co/150x150/4CAF50/FFFFFF?text=Ricardo+G"
                alt="Foto de Ricardo A Sanjur G"
                className="w-36 h-36 rounded-full object-cover mb-6 border-4 border-green-400 shadow-md"
              />
              <h4 className="text-2xl font-semibold text-gray-900 mb-2">
                Ricardo A Sanjur G
              </h4>
              <p className="text-green-600 font-medium mb-4">
                Diseñador 3D & Estratega Digital
              </p>
              <p className="text-gray-600 text-center">
                Ricardo G. es el encargado de llevar los diseños al mundo
                digital, modelando con maestría en Blender y explorando nuevas
                técnicas de impresión 3D.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recycling Section */}
      <section className="py-16 bg-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-8">
            Nuestro Compromiso con el Planeta
          </h3>
          <p className="text-lg md:text-xl leading-relaxed max-w-4xl mx-auto">
            En Topografía Especializada S.A., estamos profundamente
            comprometidos con el medio ambiente. Una parte fundamental de
            nuestra filosofía es la utilización de{' '}
            <strong>filamentos reciclados</strong> en nuestras impresiones 3D.
            Esto no solo nos permite reducir el impacto ambiental de nuestros
            productos, sino que también contribuye activamente a la economía
            circular, transformando residuos en hermosas y funcionales
            creaciones. Creemos que la innovación y la sostenibilidad pueden ir
            de la mano, y cada pieza que imprimimos es un testimonio de ello.
          </p>
          <img
            src="https://placehold.co/600x300/66BB6A/FFFFFF?text=Filamentos+Reciclados"
            alt="Filamentos reciclados"
            className="mx-auto mt-10 rounded-lg shadow-xl"
          />
        </div>
      </section>

      {/* Process Section */}
      <section id="proceso" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12 relative">
            <span className="bg-gradient-to-r from-green-500 to-green-700 text-transparent bg-clip-text">
              El Arte Detrás de Cada Creación 3D
            </span>
            <span className="block w-24 h-1 bg-green-500 mx-auto mt-2 rounded-full"></span>
          </h3>

          <div className="space-y-16">
            {/* Step 1: Artistic Design */}
            <div className="flex flex-col md:flex-row items-center justify-between md:space-x-10">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <img
                  src="https://placehold.co/600x400/AED581/FFFFFF?text=Diseño+Artístico"
                  alt="Diseño Artístico de Medalla"
                  className="rounded-xl shadow-lg w-full"
                />
              </div>
              <div className="md:w-1/2">
                <h4 className="text-2xl font-semibold text-gray-900 mb-4">
                  1. Diseño Artístico: La Chispa Inicial
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  Todo comienza con una idea, un concepto. En nuestro caso,
                  tomamos el ejemplo de la creación de una medalla. El primer
                  paso es el <strong>diseño artístico</strong>. Aquí, Eysbel A.
                  Gomez C. se encarga de conceptualizar la medalla, esbozando
                  formas, texturas y los elementos que la compondrán. Es un
                  proceso creativo donde la imaginación no tiene límites,
                  transformando una visión abstracta en un boceto detallado que
                  servirá de guía para el modelado digital. Se definen
                  proporciones, simbolismos y la estética general de la pieza,
                  asegurando que cada medalla cuente una historia única.
                </p>
              </div>
            </div>

            {/* Step 2: Blender Modeling */}
            <div className="flex flex-col md:flex-row-reverse items-center justify-between md:space-x-reverse md:space-x-10">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <img
                  src="https://placehold.co/600x400/9CCC65/FFFFFF?text=Modelado+en+Blender"
                  alt="Modelado de Medalla en Blender"
                  className="rounded-xl shadow-lg w-full"
                />
              </div>
              <div className="md:w-1/2">
                <h4 className="text-2xl font-semibold text-gray-900 mb-4">
                  2. Modelado en Blender: Abstracción y Digitalización
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  Una vez que el diseño artístico está aprobado, Ricardo A
                  Sanjur G. toma el relevo para el{' '}
                  <strong>modelado 3D en Blender</strong>. Este es un paso
                  crucial donde la idea bidimensional se traduce a un objeto
                  tridimensional. Se trata de una verdadera abstracción: tomar
                  la visión del diseño artístico y construirla meticulosamente
                  en el espacio digital. Cada curva, cada relieve y cada detalle
                  son modelados con precisión, asegurando que la pieza sea
                  estructuralmente sólida y visualmente impactante. Es un
                  proceso donde la creatividad se une a la técnica para preparar
                  la medalla para su futura materialización.
                </p>
              </div>
            </div>

            {/* Step 3: 3D Printing */}
            <div className="flex flex-col md:flex-row items-center justify-between md:space-x-10">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <img
                  src="https://placehold.co/600x400/8BC34A/FFFFFF?text=Impresora+3D"
                  alt="Impresora 3D trabajando"
                  className="rounded-xl shadow-lg w-full"
                />
              </div>
              <div className="md:w-1/2">
                <h4 className="text-2xl font-semibold text-gray-900 mb-4">
                  3. Impresión 3D: Dando Vida al Diseño
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  Finalmente, llega el momento de la{' '}
                  <strong>impresión 3D</strong>. Ricardo A. Sanjur A. se encarga
                  de preparar el modelo digital para la impresión, seleccionando
                  los filamentos (muchos de ellos reciclados, reafirmando
                  nuestro compromiso ecológico) y configurando la impresora.
                  Capa por capa, el filamento se deposita con precisión,
                  construyendo la medalla desde cero. Este proceso transforma
                  los datos digitales en un objeto físico tangible, listo para
                  ser entregado. La meticulosidad en esta etapa garantiza que la
                  pieza final no solo sea fiel al diseño original, sino que
                  también cumpla con los más altos estándares de calidad y
                  durabilidad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        id="creaciones"
        className="py-16 bg-gradient-to-r from-green-500 to-green-700 text-white text-center"
      >
        <div className="container mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para ver nuestras creaciones?
          </h3>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            Explora nuestra galería de diseños únicos, desde medallas
            personalizadas hasta piezas decorativas y funcionales.
          </p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
            <Link
              href="/medallas"
              className="bg-white text-green-700 hover:bg-gray-100 border border-green-700 font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Ver Creaciones 3D
            </Link>
            <Link
              href="/contacto"
              className="bg-white text-green-700 hover:bg-gray-100 border border-green-700 font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Contáctanos
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer id="contacto-footer" className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-4 text-center">
          <h4 className="text-2xl font-semibold mb-4">
            Topografía Especializada S.A.
          </h4>
          <p className="mb-2">Tu socio en impresión 3D y diseño sostenible.</p>
          <p className="mb-4">Para consultas y proyectos, contáctanos:</p>
          <p className="text-lg font-medium mb-4">
            Email:{' '}
            <a
              href="mailto:info@topografiaespecializada.com"
              className="text-green-400 hover:underline"
            >
              info@topografiaespecializada.com
            </a>
          </p>
          <p className="text-sm text-gray-400">
            &copy; 2025 Topografía Especializada S.A. Todos los derechos
            reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
