import { HiMagnifyingGlassCircle } from "react-icons/hi2";
import { Button } from '../../components'

export default function ListItem({ item }) {

  return (
    <div className='list-item-comp row'>
      <div>
        <p>{item.name}</p>
        <p className='subtitle'>{item.location}</p>
      </div>
      <Button backgroundless icon={<HiMagnifyingGlassCircle />} />
    </div>
  )
}