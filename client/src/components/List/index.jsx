import { ListItem } from '../'

export default function List(props) {
  const { label, items = [] } = props

  return (
    <div className='list-comp'>
      {label && <h2>{label}</h2>}
      {items.map(item => <ListItem key={item.id} item={item} />)}
    </div>
  )
}