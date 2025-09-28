
import { Link } from 'react-router-dom'
import {
  Navigation,
  Carousel, 
  CallToAction,
  Footer,
} from '../../components'
import {
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
      altText: 'Taniti National Park', 
      description: 'Taniti National Park',
      image: landscapeImage
    },
    { 
      altText: 'Villas at Yellow Leaf Bay Grand Resort', 
      description: 'Villas at Yellow Leaf Bay Grand Resort',
      image: villasImage 
    },
    { 
      altText: 'Taniti Sandbar', 
      description: 'Taniti Sandbar',
      image: sandbarImage 
    },
    { 
      altText: 'Hiking at Taniti National Park', 
      description: 'Hiking at Taniti National Park',
      image: hikingImage 
    },
    { 
      altText: 'Taniti Rainforest', 
      description: 'Taniti Rainforest',
      image: rainforestImage 
    },
  ];

  const scroll = () => document
    .getElementById('text-content')
    .scrollIntoView({ behavior: 'smooth' });

  return (
    <div className='landing-page col'>
      <Navigation />
      <Carousel 
        carouselData={carouselData} 
        header={'Explore Taniti'} 
        buttonText={'Learn More'} 
        onClick={scroll}
      />
      <div id='text-content' className='page-container'>
        <div className='section'>
          <h1>About Taniti</h1>
          <p className='emphasized-large'>
            Discover the wonder of Taniti, nestled at the heart of the Pacific. 
          </p>
          <p>
            Taniti is a tropical island where white sand beaches meet lush rainforests, 
            and ancient traditions blend seamlessly with modern comfort. Look out over Yellow Leaf 
            Bay at sunrise, and you'll understand why our little corner of the Pacific draws people 
            from all over the world.
          </p>
          <p>
            Our small island spans less than 500 square miles, yet offers a variety of landscapes to explore.
            Hike through lush forests in the morning, snorkel with native marine life in the afternoon, and end the day 
            watching the sunset from your resort balcony.
          </p>
          <p>
            The heart of our island beats in Taniti City, where you'll find charming native architecture alongside modern amenities. 
            The city sits beside the Yellow Leaf Bay, whose white sandy beaches have become a favorite among visitors 
            seeking relaxation or adventure. Our growing entertainment district at Merriton Landing has transformed into a vibrant destination, 
            offering everything from artisanal, premium shopping to exciting nightlife. 
          </p>
          <p>
            For couples, Taniti offers an intimate setting. Indulge in couples' spa treatments at our 4-star Leilani Royal Resort, 
            where traditional Tanitian healing practices meet modern wellness techniques. Share a private sunset dinner on a secluded beach or 
            take a moonlit cruise around Yellow Leaf Bay. Our couples' packages include private villa accommodations with champagne
            breakfasts on your terrace.
          </p>
          <p>Your Taniti story begins here.</p>
        </div>
        <div className='featured-items-container row'>
          <Link to='/activities' className='featured-item col'>
            <img src={dolphinImageCircular} />
            <a>Activities</a>
          </Link>
          <Link to='/dining' className='featured-item col'>
            <img src={scallopsImageCircular} />
            <a>Dining</a>
          </Link>
          <Link to='/lodging' className='featured-item col'>
            <img src={leilaniRoyalImageCircular} />
            <a>Lodging</a>
          </Link>
          <Link to='/transportation' className='featured-item col'>
            <img src={busImageCircular} />
            <a>Transportation</a>
          </Link>
        </div>
        <CallToAction />
      </div>
      <Footer />
    </div>
  )
}