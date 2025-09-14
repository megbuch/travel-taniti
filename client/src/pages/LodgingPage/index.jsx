import { useEffect, useState } from 'react'
import {
  Navigation, 
  Banner, 
  CallToAction, 
  ServiceCard, 
  Footer,
  AccommodationDetails,
} from '../../components'
import { leilaniRoyalImage } from '../../global'
import { getAccommodations } from '../../api'
import { useModal } from '../../hooks'
import './styles.scss'

export default function LodgingPage() {
  const { openModal } = useModal()
  const [accommodations, setAccommodations] = useState([])
  const bannerData = { 
    altText: 'Junior Suite at Leilani Royal Resort', 
    description: 'Junior Suite at Leilani Royal Resort',
    image: leilaniRoyalImage
  }

  useEffect(() => { fetchAccommodations() }, [])
  
  const fetchAccommodations = async () => {
    const response = await getAccommodations()
    setAccommodations(response?.accommodations?.sort((a,b) => a.name.localeCompare(b.name)))
  }

  const onView = () => {
    openModal(<AccommodationDetails accommodation={data} />)
  }
  return (
    <div className='lodging-page col'>
      <Navigation />
      <Banner bannerData={bannerData} header={'Lodging'} />
      <div className='page-container'>
        <div className='text-section'>
          <h1>Lodging</h1>
          <p className='emphasized-large'>Escape to a secluded paradise or stay in the heart of Taniti City.</p>
          <p>
            Taniti offers accommodations for every type of traveler. 
            Choose from family-owned hotels nestled in the rainforest, romantic resorts with stunning views, or charming 
            bed and breakfasts in the heart of Taniti City. Every property is strictly regulated 
            and regularly inspected by the Tanitian government to ensure your complete satisfaction.
          </p>
        </div>
        <div className='text-section'>
          <h2>Featured Accommodations</h2>
          <p>Discover some of our most popular places to stay.</p>
          <div className='hotels-container'>
            {accommodations.map((accommodation, index) => <ServiceCard 
              key={index} 
              data={accommodation} 
              onView={()=>openModal(<AccommodationDetails accommodation={accommodation} />)} />
            )}
          </div>
        </div>
        <CallToAction />
      </div>
      <Footer />
    </div>
  )
}