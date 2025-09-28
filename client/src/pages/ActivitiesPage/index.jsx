import { useEffect, useState } from 'react'
import {
  Navigation, 
  Banner, 
  CallToAction, 
  ServiceCard,
  Footer,
  ActivityDetails
} from '../../components'
import { dolphinImage } from '../../global'
import { useModal } from '../../hooks'
import { getActivities } from '../../api'
import './styles.scss'

export default function ActivitiesPage() {
  const { openModal } = useModal()
  const [activities, setActivities] = useState([])

  useEffect(() => { fetchActivities() }, [])

  const fetchActivities = async () => {
    const response = await getActivities()
    setActivities(response?.activities)
  }

  return (
    <div className='activities-page col'>
      <Navigation />
      <Banner header='Activities' description='Dolphin Encounter at Blue Lagoon' image={dolphinImage} />
      <div className='page-container'>
        <div className='section'>
          <h1>Activities</h1>
          <p className='emphasized-large'>Scale our majestic volcano, unwind on tranquil beaches, or dance the night away in Taniti City.</p>
          <p>
            Taniti offers something for every traveler. Hike our active volcano or zip-line through rainforest canopies before 
            heading to the vibrant entertainment district of Merriton Landing, offering everything from microbreweries to art galleries.
          </p>
        </div>
        {activities?.length > 0 && 
          <div className='section'>
            <h2>Featured Activities</h2>
            <p>Discover some of our most popular activities.</p>
            <div className='activities-container'>
              {activities.map((activity, index) => <ServiceCard 
                key={index} 
                data={activity}
                onView={()=>openModal(<ActivityDetails activity={activity} />)} />
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