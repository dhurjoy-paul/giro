import CarouselSection from "../../components/CarouselSection"
import NewsletterSection from "../../components/Newsletter"
import CulturalSnapshots from "./CulturalSnapshots"
import OverviewSection from "./OverviewSection"
import TourismSection from "./TourismSection"
import TouristStories from "./TouristStories"

const Home = () => {
  return (
    <>
      <CarouselSection />
      <OverviewSection />
      <TourismSection />
      <TouristStories />
      <CulturalSnapshots />
      <NewsletterSection />
    </>
  )
}
export default Home