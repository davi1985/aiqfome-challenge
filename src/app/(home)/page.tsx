import { Footer } from '@/components/footer'
import Image from 'next/image'
import { FoodPlacesSection } from './food-places-section'

const Home = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center justify-center mt-0 sm:mt-4">
        <Image
          src="/images/banner.png"
          alt="banner"
          className="object-cover sm:shadow sm:rounded-sm"
          width={500}
          height={128}
        />
      </div>

      <div className="px-4 py-6">
        <FoodPlacesSection />
      </div>

      <Footer />
    </div>
  )
}

export default Home
