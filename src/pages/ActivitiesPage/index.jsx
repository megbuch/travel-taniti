import { Navigation, Banner, CallToAction, dolphinImage } from '../../global'

export default function ActivitiesPage() {
  const bannerData = { 
    altText: 'Dolphin Encounter at Blue Lagoon', 
    description: 'Dolphin Encounter at Blue Lagoon',
    image: dolphinImage 
  }

  
  return (
    <div className='activities-page col'>
      <Navigation />
      <Banner bannerData={bannerData} header={'Activities'}/>
      <div className='page-container'>
        <div className='text-section'>
          <h1>Activities</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione vero consequatur placeat recusandae deserunt excepturi fuga! Recusandae optio, doloribus nesciunt quo minus molestiae itaque dolorem aut officiis iusto voluptates asperiores! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo quis consequuntur enim ea architecto odio quia commodi eius, obcaecati quas non repellendus quaerat et officia mollitia doloremque expedita, dignissimos nulla. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, aperiam nemo aut est iure ducimus ipsum architecto quas hic corrupti minima, debitis adipisci. Tempora molestias, reiciendis mollitia eius accusantium ducimus!</p>
        </div>
        <CallToAction />
      </div>
    </div>
  )
}