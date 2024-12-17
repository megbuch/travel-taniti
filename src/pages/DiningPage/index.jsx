import { Navigation, Banner, CallToAction, scallopsImage } from '../../global'

export default function DiningPage() {
  const bannerData = { 
    altText: 'Scallops at Pinnacove Restaurant', 
    description: 'Scallops at Pinnacove Restaurant',
    image: scallopsImage 
  }
  
  return (
    <div className='dining-page col'>
      <Navigation />
      <Banner bannerData={bannerData} header={'Dining'}/>
      <div className='page-container'>
        <div className='text-section'>
          <h1>Dining</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione vero consequatur placeat recusandae deserunt excepturi fuga! Recusandae optio, doloribus nesciunt quo minus molestiae itaque dolorem aut officiis iusto voluptates asperiores! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo quis consequuntur enim ea architecto odio quia commodi eius, obcaecati quas non repellendus quaerat et officia mollitia doloremque expedita, dignissimos nulla. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, aperiam nemo aut est iure ducimus ipsum architecto quas hic corrupti minima, debitis adipisci. Tempora molestias, reiciendis mollitia eius accusantium ducimus!</p>
        </div>
        <CallToAction />
      </div>
    </div>
  )
}