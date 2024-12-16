import Carousel from '../../components/Carousel/index';
import sandbarImage from '../../assets/images/sandbar.jpg';
import villasImage from '../../assets/images/villas.jpg';
import rainforestImage from '../../assets/images/rainforest.jpg';
import landscapeImage from '../../assets/images/landscape.jpg';
import hikingImage from '../../assets/images/hiking.jpg';

import './styles.scss'

export default function LandingPageScreen() {
  const images = [
    { altText: 'Woman hiking on volcano at Tahiti National Park', image: hikingImage },
    { altText: 'Tahiti sandbar', image: sandbarImage },
    { altText: 'Villas at Leilani Royal Resort', image: villasImage },
    { altText: 'Tahiti Rainforest', image: rainforestImage },
    { altText: 'Tahiti landscape', image: landscapeImage },
  ];

  return (
    <div className='landing-page-component'>
      <Carousel items={images} overlayText={'Explore Tahiti'} />
      <h2>About Tahiti</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione vero consequatur placeat recusandae deserunt excepturi fuga! Recusandae optio, doloribus nesciunt quo minus molestiae itaque dolorem aut officiis iusto voluptates asperiores! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo quis consequuntur enim ea architecto odio quia commodi eius, obcaecati quas non repellendus quaerat et officia mollitia doloremque expedita, dignissimos nulla. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, aperiam nemo aut est iure ducimus ipsum architecto quas hic corrupti minima, debitis adipisci. Tempora molestias, reiciendis mollitia eius accusantium ducimus!</p>
    </div>
  )
}