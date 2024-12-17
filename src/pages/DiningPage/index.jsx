import { 
  Navigation, 
  Banner, 
  CallToAction,
  FeaturedCard, 
  scallopsImage,
  yellowLeafGrillSquare,
  pinnacoveImageSquare,
  seaAndStoneImageSquare 
} from '../../global'
import './styles.scss'

export default function DiningPage() {
  const bannerData = { 
    altText: 'Scallops at Sea & Stone', 
    description: 'Scallops at Sea & Stone',
    image: scallopsImage 
  }

  const featuredRestaurants = [
    {
      name: 'Sea & Stone',
      rating: '⭐⭐⭐⭐⭐',
      description: 'Upscale Pan-Asian fusion dining featuring fresh seafood and local ingredients. Rooftop cocktail bar.',
      address: '45 Maera Avenue | Merriton Landing',
      image: seaAndStoneImageSquare
    },
    {
      name: 'Yellow Leaf Grill',
      rating: '⭐⭐⭐⭐⭐',
      description: 'Family-owned grill serving traditional Tanitian fish and rice recipes.',
      address: '110 Yellow Leaf Circle | Yellow Leaf Bay',
      image: yellowLeafGrillSquare
    },
    {
      name: 'Pinnacove',
      rating: '⭐⭐⭐⭐⭐',
      description: 'American dining with scenic views, known for beachfront dining. Popular happy hour spot.',
      address: '92 Luana Way | Yellow Leaf Bay',
      image: pinnacoveImageSquare
    },
  ]
  
  return (
    <div className='dining-page col'>
      <Navigation />
      <Banner bannerData={bannerData} header={'Dining'}/>
      <div className='page-container'>
        <div className='text-section'>
          <h1>Dining</h1>
          <p className='emphasized-large'>Taniti offers a range of dining options, from fine dining to local favorites.</p>
          <p>
            Choose from our ten restaurants across Taniti. Sample fresh-caught fish and traditional rice 
            dishes at our five local establishments, enjoy familiar comfort at our three American-style restaurants, 
            or explore a mix of both at our two Pan-Asian fusion venues.
          </p>
        </div>
        <div className='text-section'>
          <h2>Featured Restaurants</h2>
          <p>Discover some of our most popular restaurants.</p>
          <div className='featured-hotels-container col'>
            {featuredRestaurants.map((restaurant, index) => <FeaturedCard key={index} data={restaurant} />)}
          </div>
        </div>
        <CallToAction />
      </div>
    </div>
  )
}