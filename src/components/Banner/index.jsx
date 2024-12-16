import './styles.scss'

// The Banner is a reusable component that contains a single image and an optional header.
// Item is an object containing altText, description, image properties.
// Example: [{ altText: string, description: string, image: path to image source }]

export default function Banner({ bannerData, header }) {
  return (
    <div className='banner'>
      {header && <h1>{header}</h1>}
      <div className='color-overlay'></div>
      <p className='description-overlay'>{bannerData.description}</p>
      <img src={bannerData.image} alt={bannerData.altText} />
    </div>
  )
}