
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
      <div className="absolute bottom-16 w-full flex justify-center">
        <button className="bg-amber-900 text-white px-6 py-3 rounded-full shadow-lg hover:bg-amber-800 transition">
          Entrar
        </button>
      </div>
    </div>
  )
}

export { IntroPage }
