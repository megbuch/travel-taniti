import InfoIcon from '@mui/icons-material/Info';
import { Button } from '../../components'

export default function ListItem({ item, onView }) {
  return (
    <div className='list-item-comp row'>
      <div>
        <p>{item.name || `${item.firstName} ${item.lastName}`}</p>
        <p className='subtitle'>{item.location || item.email}</p>
      </div>
      <Button backgroundless small icon={<InfoIcon onClick={()=>onView(item)} />} />
    </div>
  )
}