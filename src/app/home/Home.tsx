import CardsSection from "../../Components/CardsSection"
import Hero from "../../Components/Hero"

const Home = () => {
  return (
    <div className="w-full min-h-[100dvh] bg-white flex items-center justify-center">
      <Hero />
      <CardsSection />
    </div>
  )
}

export { Home }
