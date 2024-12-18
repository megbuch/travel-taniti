import './styles.scss'

export default function FeaturedCard({ data }) {
  return (
    <div className='featured-card col'>
      <img src={data.image} alt={data.name} />
      <>
        <h3>{data.name}</h3>
        <p className='subtitle'>{data.address}</p>
        <p>{data.rating}</p>
        <p>{data.description}</p>
      </>
    </div>
  )
}