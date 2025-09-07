import { useEffect, useState } from 'react'
import {
  Navigation, 
  Banner, 
  CallToAction, 
  ServiceCard,
  Footer,
} from '../../components'
import { 
  dolphinImage,
  microbreweryImageSquare,
  weddingImageSquare,
  volcanoImageSquare
} from '../../global'
import { getActivities } from '../../api'
import './styles.scss'

export default function ActivitiesPage() {
  const [activities, setActivities] = useState([])

  const bannerData = { 
    altText: 'Dolphin Encounter at Blue Lagoon', 
    description: 'Dolphin Encounter at Blue Lagoon',
    image: dolphinImage 
  }

  useEffect(() => { fetchActivities() }, [])

  const fetchActivities = async () => {
    const response = await getActivities()
    setActivities(response?.activities)
  }

  return (
    <div className='activities-page col'>
      <Navigation />
      <Banner bannerData={bannerData} header={'Activities'}/>
      <div className='page-container'>
        <div className='text-section'>
          <h1>Activities</h1>
          <p className='emphasized-large'>Scale our majestic volcano, unwind on tranquil beaches, or dance the night away in Taniti City.</p>
        </div>
        <div className='section col'>
          <div className='text-section'>
            <h2>Entertainment</h2>
            <p>
              Visit Merriton Landing, our entertainment district. You can visit the newest club, or
              sample craft beer at the microbrewery. Challenge your friends to a game at our arcade or bowling alley. 
              Art and history enthusiasts will enjoy our local galleries and museums. Merriton Landing is perfect for date nights, 
              family outings, or evening entertainment after a day of adventure.
            </p>
          </div>
          <img src={microbreweryImageSquare} alt='Microbrewery at Merriton Landing' />
        </div>
        <div className='section reverse col'>
          <div className='text-section'>
            <h2>Experiences</h2>
            <p>
              Create unforgettable memories in Taniti, whether you're celebrating your honeymoon, planning a beach wedding, 
              or seeking family adventures. Take a romantic helicopter tour of the active volcano. Adventurous couples can 
              zip-line through the rainforest canopy. Nature lovers might prefer our guided hiking tours. For a special 
              occasion, arrange a private beachfront dinner or couple's spa treatment at one of our luxury resorts.
            </p>
          </div>
          <img src={weddingImageSquare} alt='Beach wedding in Taniti' />
        </div>
        <div className='section col'>
          <div className='text-section'>
            <h2>Sightseeing</h2>
            <p>
              Discover the natural beauty and cultural richness of Taniti City. Take a romantic stroll through our historic 
              streets, or join our island bus tours to explore hidden gems beyond the city. Adventure seekers can hike to 
              our active volcano for breathtaking views or traverse through our lush rainforest canopy. Our experienced tour guides 
              can customize itineraries to match your interests.
            </p>
          </div>
          <img src={volcanoImageSquare} alt='Active volcano' />
        </div>
        <div className='text-section'>
          <h2>Featured Activities</h2>
          <p>Discover some of our most popular activities.</p>
          <div className='activities-container col'>
            {activities.map((activity, index) => <ServiceCard key={index} data={activity} />)}
          </div>
        </div>
        <CallToAction />
      </div>
      <Footer />
    </div>
  )
}