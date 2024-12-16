
import { Link } from 'react-router-dom';
import {
  Carousel, 
  sandbarImage, 
  villasImage, 
  rainforestImage,
  landscapeImage,
  hikingImage,
  diningImage,
  lodgingImage,
  activitiesImage,
  transportationImage
} from '../../global';
import './styles.scss'

export default function LandingPage() {
  const images = [
    { altText: 'Woman hiking on volcano at Tahiti National Park', image: hikingImage },
    { altText: 'Tahiti sandbar', image: sandbarImage },
    { altText: 'Villas at Leilani Royal Resort', image: villasImage },
    { altText: 'Tahiti Rainforest', image: rainforestImage },
    { altText: 'Tahiti landscape', image: landscapeImage },
  ];

  return (
    <div className='landing-page'>
      <Carousel items={images} overlayText={'Explore Tahiti'} />
      <div className='page-container col'>
        <h2>About Tahiti</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione vero consequatur placeat recusandae deserunt excepturi fuga! Recusandae optio, doloribus nesciunt quo minus molestiae itaque dolorem aut officiis iusto voluptates asperiores! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo quis consequuntur enim ea architecto odio quia commodi eius, obcaecati quas non repellendus quaerat et officia mollitia doloremque expedita, dignissimos nulla. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, aperiam nemo aut est iure ducimus ipsum architecto quas hic corrupti minima, debitis adipisci. Tempora molestias, reiciendis mollitia eius accusantium ducimus!</p>
        <div className='featured-items-container row'>
          <div className='featured-item col'>
            <img src={activitiesImage} />
            <Link to='/activities'>Activities</Link>
          </div>
          <div className='featured-item col'>
            <img src={diningImage} />
            <Link to='/dining'>Dining</Link>
          </div>
          <div className='featured-item col'>
            <img src={lodgingImage} />
            <Link to='/lodging'>Lodging</Link>
          </div>
          <div className='featured-item col'>
            <img src={transportationImage} />
            <Link to='/transportation'>Transportation</Link>
          </div>
        </div>
      </div>
    </div>
  )
}