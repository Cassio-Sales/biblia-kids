import Image from 'next/image'

const IntroPage = () => {
  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden bg-black flex items-center justify-center">
      <Image
        src="/assets/images/intro.png"
        alt="Tela inicial Bíblia Kids"
        fill
        priority
        sizes="100vw"
        className="object-contain"
      />
    </div>
  )
}

export { IntroPage }
