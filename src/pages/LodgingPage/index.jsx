import { 
  Navigation, 
  Banner, 
  CallToAction, 
  FeaturedHotelCard, 
  leilaniRoyalImage, 
  leilaniRoyalImageSquare, 
  yellowLeafBayGrandImageSquare,
  seasideImageSquare
} from '../../global'
import './styles.scss'

export default function LodgingPage() {
  const bannerData = { 
    altText: 'Junior Suite at Leilani Royal Resort', 
    description: 'Junior Suite at Leilani Royal Resort',
    image: leilaniRoyalImage
  }

  const featuredHotels = [
    {
      name: 'Leilani Royal Resort',
      rating: '⭐⭐⭐⭐',
      description: ' Our premier four-star resort offers spacious suites, spa services, and direct access to Merriton Landing for dining and entertainment.',
      address: '120 Paragon Way | Merriton Landing',
      image: leilaniRoyalImageSquare
    },
    {
      name: 'Yellow Leaf Bay Grand Resort',
      rating: '⭐⭐⭐',
      description: 'Surrounded by rainforest overlooking Yellow Leaf Bay, this resort offers a natural paradise with hiking trails and traditional Tanitian villas.',
      address: '570 Bay Circle | Yellow Leaf Bay',
      image: yellowLeafBayGrandImageSquare
    },
    {
      name: 'Seaside Villas',
      rating: '⭐⭐⭐',
      description: 'Private beachfront villas offer a romantic, adult-only escape. Each villa features ocean views, direct beach access, and authentic Tanitian architecture.',
      address: '821 Pacific Drive | Taniti Sandbar',
      image: seasideImageSquare
    },
  ]

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
          <div className='featured-hotels-container col'>
            {featuredHotels.map((hotel, index) => <FeaturedHotelCard key={index} hotelData={hotel} />)}
          </div>
        </div>
        <CallToAction />
      </div>
    </div>
  )
}