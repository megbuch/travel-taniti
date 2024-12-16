
import { Link } from 'react-router-dom'
import {
  Navigation,
  Carousel, 
  CallToAction,
  sandbarImage, 
  villasImage, 
  rainforestImage,
  landscapeImage,
  hikingImage,
  scallopsImageCircular,
  leilaniRoyalImageCircular,
  dolphinImageCircular,
  busImageCircular
} from '../../global'
import './styles.scss'

export default function LandingPage() {
  const carouselData = [
    { 
      altText: 'Tahiti National Park', 
      description: 'Tahiti National Park',
      image: landscapeImage
    },
    { 
      altText: 'Villas at Leilani Royal Resort', 
      description: 'Villas at Leilani Royal Resort',
      image: villasImage 
    },
    { 
      altText: 'Tahiti Sandbar', 
      description: 'Tahiti Sandbar',
      image: sandbarImage 
    },
    { 
      altText: 'Hiking at Tahiti National Park', 
      description: 'Hiking at Tahiti National Park',
      image: hikingImage 
    },
    { 
      altText: 'Tahiti Rainforest', 
      description: 'Tahiti Rainforest',
      image: rainforestImage 
    },
  ];

  return (
    <div className='landing-page col'>
      <Navigation />
      <Carousel carouselData={carouselData} header={'Explore Tahiti'} />
      <div className='page-container'>
        <div className='text-section'>
          <h1>About Tahiti</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione vero consequatur placeat recusandae deserunt excepturi fuga! Recusandae optio, doloribus nesciunt quo minus molestiae itaque dolorem aut officiis iusto voluptates asperiores! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo quis consequuntur enim ea architecto odio quia commodi eius, obcaecati quas non repellendus quaerat et officia mollitia doloremque expedita, dignissimos nulla. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, aperiam nemo aut est iure ducimus ipsum architecto quas hic corrupti minima, debitis adipisci. Tempora molestias, reiciendis mollitia eius accusantium ducimus!</p>
        </div>
        <div className='featured-items-container row'>
          <div className='featured-item col'>
            <img src={dolphinImageCircular} />
            <Link to='/activities'>Activities</Link>
          </div>
          <div className='featured-item col'>
            <img src={scallopsImageCircular} />
            <Link to='/dining'>Dining</Link>
          </div>
          <div className='featured-item col'>
            <img src={leilaniRoyalImageCircular} />
            <Link to='/lodging'>Lodging</Link>
          </div>
          <div className='featured-item col'>
            <img src={busImageCircular} />
            <Link to='/transportation'>Transportation</Link>
          </div>
        </div>
        <CallToAction />
      </div>
    </div>
  )
}