import CarouselSection from "../../components/CarouselSection"
import NewsletterSection from "../../components/Newsletter"
import CulturalSnapshots from "./CulturalSnapshots"
import OverviewSection from "./OverviewSection"
import TourismSection from "./TourismSection"
import TouristStories from "./TouristStories"
import TravelStats from "./TravelStats"
import TravelTips from "./TravelTips"

const Home = () => {
  return (
    <>
      <CarouselSection />
      <OverviewSection />
      <TourismSection />
      <TravelStats />
      <TouristStories />
      <TravelTips />
      <CulturalSnapshots />
      <NewsletterSection />
    </>
  )
}
export default Home