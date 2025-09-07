import { useEffect, useState } from 'react'
import {
  Navigation, 
  Banner, 
  CallToAction,
  ServiceCard, 
  Footer,
} from '../../components'
import { getRestaurants } from '../../api'
import { scallopsImage } from '../../global'
import './styles.scss'

export default function DiningPage() {
  const [restaurants, setRestaurants] = useState([])

  const bannerData = { 
    altText: 'Scallops at Sea & Stone', 
    description: 'Scallops at Sea & Stone',
    image: scallopsImage 
  }

  useEffect(() => { fetchRestaurants() }, [])

  const fetchRestaurants = async () => {
    const response = await getRestaurants()
    setRestaurants(response?.restaurants)
  }
  
  return (
    <div className='dining-page col'>
      <Navigation />
      <Banner bannerData={bannerData} header={'Dining'}/>
      <div className='page-container'>
        <div className='text-section'>
          <h1>Dining</h1>
          <p className='emphasized-large'>Taniti offers a range of dining options, from fine dining to local favorites.</p>
          <p>
            Choose from our ten restaurants across Taniti. Sample fresh-caught fish and traditional rice 
            dishes at our five local establishments, enjoy familiar comfort at our three American-style restaurants, 
            or explore a mix of both at our two Pan-Asian fusion venues.
          </p>
        </div>
        <div className='text-section'>
          <h2>Featured Restaurants</h2>
          <p>Discover some of our most popular restaurants.</p>
          <div className='restaurants-container col'>
            {restaurants.map((restaurant, index) => <ServiceCard key={index} data={restaurant} />)}
          </div>
        </div>
        <CallToAction />
      </div>
      <Footer />
    </div>
  )
}