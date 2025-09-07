import StarIcon from '@mui/icons-material/Star';
import './styles.scss'


export default function ServiceCard({ data }) {
  const renderStars = count => {
    return [...Array(count)].map((_, i) => <StarIcon key={i} />)
  }

  return (
    <div className='featured-card col'>
      <img src={data.imageURL} alt={data.name} />
      <>
        <h3>{data.name}</h3>
        <p className='subtitle'>{data.location}</p>
        <p>{renderStars(data.rating)}</p>
        <p>{data.description}</p>
      </>
    </div>
  )
}