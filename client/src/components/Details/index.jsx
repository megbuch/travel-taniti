import { FaStar } from "react-icons/fa";

export default function Details({ item }) {
  const renderStars = count => {
    return [...Array(count)].map((_, i) => <FaStar key={i} />)
  }

  return (
    <div className='details-comp col'>
      <h1>{item.name}</h1>
      <p>{item.description}</p>
      <p>{renderStars(item.rating)}</p>
      <h4>Contact</h4>
      <p>{item.location}</p>
      <p>{item.contactEmail}</p>
      <p>{item.contactPhone}</p>
      {item?.roomTypes?.map(rt => <p>{rt.name}</p>)}

      {/* {resourceType == RT.ACCOMMODATION && 
        <>
          <p>{resource.checkInTime}</p>
          <p>{resource.checkOutTime}</p>
          {resource.amenities?.map(a => <p>{a}</p>)}
          <h4>Room Details</h4>
          <p>blahhh</p>
        </>
      } */}

    </div>
  )
}