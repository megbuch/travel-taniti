import { HiMagnifyingGlassCircle } from "react-icons/hi2";
import { Button, Details } from '../../components'
import { useModal } from "../../hooks";

export default function ListItem({ item }) {
  const { openModal } = useModal()

  return (
    <div className='list-item-comp row'>
      <div>
        <p>{item.name}</p>
        <p className='subtitle'>{item.location}</p>
      </div>
      <Button backgroundless icon={<HiMagnifyingGlassCircle onClick={()=>openModal(<Details item={item} />)} />} />
    </div>
  )
}