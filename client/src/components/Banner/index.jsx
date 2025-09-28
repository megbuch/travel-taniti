import './styles.scss'

export default function Banner({ header, description, image }) {
  return (
    <div className='banner'>
      {header && <h1>{header}</h1>}
      <div className='color-overlay'></div>
      <p className='description-overlay'>{description}</p>
      <img src={image} alt={description} />
    </div>
  )
}