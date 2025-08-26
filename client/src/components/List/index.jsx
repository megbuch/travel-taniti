import { ListItem, Button } from '../'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function List(props) {
  const { items = [], onView } = props
  return (
    <div className='list-comp'>
      {items.map(item => <ListItem key={item.id} item={item} onView={onView} />)}
    </div>
  )
}