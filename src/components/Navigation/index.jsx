import { Link } from 'react-router-dom'
import { useModal } from '../../global/ModalContext.jsx'
import './styles.scss'

export default function Navigation() {
  const { openModal } = useModal();

  return (
    <div className='navigation'>
      <p className='logo'>🌿</p>
      <ul>
        <li className='link'>
          <Link to='/' className='link'>Home</Link>
        </li>
        <li className='link'>
          <Link to='/activities' className='link'>Activities</Link>
        </li>
        <li className='link'>
          <Link to='/dining' className='link'>Dining</Link>
        </li>
        <li className='link'>
          <Link to='/lodging' className='link'>Lodging</Link>
        </li>
        <li className='link'>
          <Link to='/transportation' className='link'>Transportation</Link>
        </li>
        <li>
          <button onClick={openModal} className='small-btn'>Contact Us</button>
        </li>
      </ul>
    </div>
  );
};