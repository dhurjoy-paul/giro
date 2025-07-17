import CarouselSection from "../../components/CarouselSection"
import NewsletterSection from "../../components/Newsletter"
import OverviewSection from "./OverviewSection"
import VideoFeatureSection from "./VideoFeatureSection"
import WhyGiroSection from "./WhyGiroSection"

const Home = () => {
  return (
    <>
      <CarouselSection />
      <OverviewSection />
      <VideoFeatureSection />
      <NewsletterSection />
    </>
  )
}
export default Home