export default function BookingEdit({ booking }) {
  return (
    <form onSubmit={save} className='col'>
      <h1>{`${booking ? 'Edit': 'Create'} Booking`}</h1>
    </form>
  )
}