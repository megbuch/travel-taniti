import { ListItem, Button } from '../'
import './styles.scss'

export default function List(props) {
  const { items = [], onView } = props
  
  return (
    <div className='list-comp col'>
      {items.map(item => <ListItem key={item.id} item={item} onView={onView} />)}
    </div>
  )
}