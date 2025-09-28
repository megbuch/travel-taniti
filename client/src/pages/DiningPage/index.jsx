import { useEffect, useState } from 'react'
import {
  Navigation, 
  Banner, 
  CallToAction,
  ServiceCard, 
  Footer,
  RestaurantDetails,
} from '../../components'
import { scallopsImage } from '../../global'
import { getRestaurants } from '../../api'
import { useModal } from '../../hooks'
import './styles.scss'

export default function DiningPage() {
  const { openModal } = useModal()
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => { fetchRestaurants() }, [])

  const fetchRestaurants = async () => {
    const response = await getRestaurants()
    setRestaurants(response?.restaurants)
  }
  
  return (
    <div className='dining-page col'>
      <Navigation />
      <Banner header='Dining' description='Scallops at Salt & Stone' image={scallopsImage} />
      <div className='page-container'>
        <div className='section'>
          <h1>Dining</h1>
          <p className='emphasized-large'>Taniti offers a range of dining options, from fine dining to local favorites.</p>
          <p>
            Sample fresh-caught fish and traditional rice dishes at our local establishments, 
            enjoy familiar comfort at American-style restaurants, or explore a mix of both with Pan-Asian fusion cuisine.
          </p>
        </div>
        {restaurants?.length > 0 && 
          <div className='section'>
            <h2>Featured Restaurants</h2>
            <p>Discover some of our most popular restaurants.</p>
            <div className='restaurants-container'>
              {restaurants.map((restaurant, index) => <ServiceCard 
                key={index} 
                data={restaurant} 
                onView={()=>openModal(<RestaurantDetails restaurant={restaurant} />)} />
              )}
            </div>
          </div>
        }
        <CallToAction />
      </div>
      <Footer />
    </div>
  )
}