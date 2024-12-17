import './styles.scss'

export default function FeaturedHotelCard({ hotelData }) {
  return (
    <div className='featured-hotel-card col'>
      <img src={hotelData.image} alt={hotelData.name} />
      <>
        <h3>{hotelData.name}</h3>
        <p className='address'>{hotelData?.address}</p>
        <p>{hotelData.rating}</p>
        <p>{hotelData.description}</p>
      </>
    </div>
  )
}