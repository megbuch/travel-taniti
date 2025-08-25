import { ListItem, Button } from '../'
import { IoAddCircleOutline } from "react-icons/io5";

export default function List(props) {
  const { label, items = [], onAdd } = props

  return (
    <div className='list-comp'>
      <div className='row'>
        {label && <h2>{label}</h2>}
        {onAdd && <Button backgroundless icon={<IoAddCircleOutline />} onClick={onAdd} />}
      </div>
      {items.map(item => <ListItem key={item.id} item={item} />)}
    </div>
  )
}