import Image from 'next/image'

const IntroPage = () => {
  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden bg-black">
      <Image
        src="/assets/images/intro.png"
        alt="Tela inicial Bíblia Kids"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
    </div>
  )
}

export { IntroPage }
