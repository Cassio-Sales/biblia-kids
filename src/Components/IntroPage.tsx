import { Baloo_2 } from 'next/font/google'

const baloo = Baloo_2({
  subsets: ['latin'],
  weight: ['400', '500', '700']
})

const IntroPage = () => {
  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden bg-black">
      {/* Vídeo de fundo */}
      <video
        src="/assets/videos/intro.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Botão por cima do vídeo */}
      <div className="absolute bottom-3 w-full flex justify-center">
        <button
          className={`${baloo.className} bg-[#40A099] text-white px-12 py-2 rounded-full  shadow-lg hover:bg-amber-600 transition`}
        >
          <span className="text-3xl font-bold tracking-wide ">ENTRAR</span>
        </button>
      </div>
    </div>
  )
}

export { IntroPage }
