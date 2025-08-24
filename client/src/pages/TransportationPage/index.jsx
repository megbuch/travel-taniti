import {
  Navigation, 
  Banner, 
  CallToAction, 
  Footer,
} from '../../components'
import { 
  busImage,
  mapImage
} from '../../global'
import './styles.scss'

export default function TransportationPage() {
    const bannerData = { 
      altText: 'Bus at Leilani Royal Resort', 
      description: 'Bus at Leilani Royal Resort',
      image: busImage 
    }

  return (
    <div className='transportation-page col'>
      <Navigation />
      <Banner bannerData={bannerData} header={'Transportation'} />
      <div className='page-container'>
        <div className='text-section'>
          <h1>Transportation</h1>
          <p className='emphasized-large'>Taniti provides many options for transportation to, from, and within the island.</p>
        </div>
        <div className='col two-column-container'>
          <div className='col'>
            <div className='text-section'>
              <h2>Getting Here</h2>
              <h3>🛬 Air</h3>
              <p>Fly to Taniti Regional Airport (TAN), which is currently served by regional carriers including Island Air Connection, SkyLink Pacific, and Taniti Air. Our airport currently handles smaller aircraft, but will be expanding to accommodate larger jets in the coming years.</p>
              <h3>🚢 Cruise</h3>
              <p>The Paradise Voyager Line that departs from Indonesia, Philippines, and Singapore arrives on Thursdays for overnight stops in Yellow Leaf Bay.</p>
            </div>
            <img className='map' src={mapImage} />
          </div>
          <div className='text-section'>
            <h2>Getting Around</h2>
            <h3>📱 Rideshare</h3>
            <p>IslandRide accepts major credit cards and operates through a familiar mobile-app-based system.</p>
            <h3>🚘 Rental Car</h3>
            <p>Several car rental agencies serve Taniti, including Pacific Drive and Papaya Rentals. Our agencies are located at Taniti Regional Airport and in Yellow Leaf Bay.</p>
            <h3>🚐 Hotel Shuttle</h3>
            <p>Many hotels offer complimentary shuttle service to and from the airport, Yellow Leaf Bay, and popular tourist destinations. Contact your hotel directly to arrange pickup times.</p>
            <h3>🚌 Public Bus</h3>
            <p>The Taniti City bus provides regular service between Taniti City and tourist areas from 6 AM to 10 PM daily.</p>
          </div>
        </div>
        <CallToAction />
      </div>
       <Footer />
    </div>
  )
}