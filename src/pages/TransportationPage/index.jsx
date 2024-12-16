import { Navigation, Banner, busImage } from '../../global'

export default function TransportationPage() {
    const bannerData = { 
      altText: 'Bus at Leilani Royal Resort', 
      description: 'Bus at Leilani Royal Resort',
      image: busImage 
    }

  return (
    <div className='transportation-page'>
      <Navigation />
      <Banner bannerData={bannerData} header={'Transportation'} />
      <div className='page-container'>
        <div className='text-section'>
          <h1>Transportation</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione vero consequatur placeat recusandae deserunt excepturi fuga! Recusandae optio, doloribus nesciunt quo minus molestiae itaque dolorem aut officiis iusto voluptates asperiores! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo quis consequuntur enim ea architecto odio quia commodi eius, obcaecati quas non repellendus quaerat et officia mollitia doloremque expedita, dignissimos nulla. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, aperiam nemo aut est iure ducimus ipsum architecto quas hic corrupti minima, debitis adipisci. Tempora molestias, reiciendis mollitia eius accusantium ducimus!</p>
        </div>
      </div>
    </div>
  )
}