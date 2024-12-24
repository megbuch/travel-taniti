import { Link } from 'react-router-dom'
import { useModal } from '../../global/ModalContext.jsx'
import './styles.scss'

export default function Navigation() {
  const { openModal } = useModal();

  return (
    <div className='navigation'>
      <Link to='/'><p className='logo'>🌿</p></Link>
      <ul>
        <li className='link'>
          <Link to='/'>Home</Link>
        </li>
        <li className='link'>
          <Link to='/activities' className='link'>Activities</Link>
        </li>
        <li className='link'>
          <Link to='/dining'>Dining</Link>
        </li>
        <li className='link'>
          <Link to='/lodging'>Lodging</Link>
        </li>
        <li className='link'>
          <Link to='/transportation'>Transportation</Link>
        </li>
        <li>
          <button onClick={openModal} className='small-btn'>Contact Us</button>
        </li>
      </ul>
    </div>
  );
};