import CardsSection from "../../Components/CardsSection"
import Hero from "../../Components/Hero"

const Home = () => {
  return (
    <div className="w-full min-h-[100dvh] bg-white flex flex-col items-center">
      <Hero />
      <CardsSection />
    </div>
  )
}

export { Home }
