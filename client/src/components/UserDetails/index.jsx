export default function UserDetails({ user }) {

  return (
    <div className='user-details-comp details'>
      <h1>{`${user.firstName} ${user.lastName}`}</h1>
      <p>{user.email}</p>
      <p className='subtitle'>{`Created ${new Date(user.createdAt).toLocaleDateString()}`}</p>
    </div>
  )
}