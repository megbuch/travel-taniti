import { Link } from 'react-router-dom'
import { useModal } from '../../contexts/ModalContext.jsx'
import { ContactForm, LoginForm, Button } from '../'
import './styles.scss'

export default function Navigation() {
  const { openModal, closeModal, isModalOpen } = useModal();

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
          <Button small onClick={()=>openModal(<ContactForm />)} text='Contact Us' />
          <Button small onClick={()=>openModal(<LoginForm />)} text='Sign In' />
        </li>
      </ul>
    </div>
  );
};