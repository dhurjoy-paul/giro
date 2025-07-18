import CarouselSection from "../../components/CarouselSection"
import NewsletterSection from "../../components/Newsletter"
// import OverviewSection from "./OverviewSection"
import TourismSection from "./TourismSection"
// import VideoFeatureSection from "./VideoFeatureSection"

const Home = () => {
  return (
    <>
      <CarouselSection />
      <TourismSection />
      {/* <OverviewSection /> */}
      {/* <VideoFeatureSection /> */}
      <NewsletterSection />
    </>
  )
}
export default Home