export default function UserDetails({ user }) {
  return (
    <div className='user-details-comp col'>
      <h1>{`${user.firstName} ${user.lastName}`}</h1>
      <p>{user.email}</p>
      <p>{user.password}</p>
      {/* todo: show bookings? */}
    </div>
  )
}