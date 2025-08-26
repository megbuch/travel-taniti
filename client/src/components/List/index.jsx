import { ListItem, Button } from '../'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function List(props) {
  const { label, items = [], onCreate, onView } = props
  return (
    <div className='list-comp'>
      <div className='row'>
        {label && <h2>{label}</h2>}
        {onCreate && <Button backgroundless icon={<AddCircleOutlineIcon />} onClick={onCreate} />}
      </div>
      {items.map(item => <ListItem key={item.id} item={item} onView={onView} />)}
    </div>
  )
}