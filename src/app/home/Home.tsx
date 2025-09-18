import CardsSection from "../../Components/CardsSection"
import Hero from "../../Components/Hero"

const Home = () => {
  return (
    <div className="w-full min-h-[100dvh] max-w-md mx-auto flex flex-col items-center">
      <Hero />
      <CardsSection />
    </div>
  )
}

export { Home }
