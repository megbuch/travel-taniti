import { 
  Navigation, 
  Banner, 
  CallToAction, 
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
        <div className='row'>
          <div className='text-section'>
            <h1>Transportation</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione vero consequatur placeat recusandae deserunt excepturi fuga! Recusandae optio, doloribus nesciunt quo minus molestiae itaque dolorem aut officiis iusto voluptates asperiores! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo quis consequuntur enim ea architecto odio quia commodi eius, obcaecati quas non repellendus quaerat et officia mollitia doloremque expedita, dignissimos nulla. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, aperiam nemo aut est iure ducimus ipsum architecto quas hic corrupti minima, debitis adipisci. Tempora molestias, reiciendis mollitia eius accusantium ducimus!</p>
          </div>
          <div className='col'>
            <h2>Map of Taniti</h2>
            <img className='map' src={mapImage} />
          </div>
        </div>
        <CallToAction />
      </div>
    </div>
  )
}