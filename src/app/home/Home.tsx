import CardsSection from "../../Components/CardsSection"
import Hero from "../../Components/Hero"

const Home = () => {
  return (
    <div className="w-full min-h-[100dvh] flex flex-col bg-white">
      <Hero />
      <CardsSection />
    </div>
  )
}

export { Home }
