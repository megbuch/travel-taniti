import { Link } from 'react-router-dom'
import { useModal, useSession } from '../../hooks'
import { ContactForm, SignInForm, Button } from '../'
import './styles.scss'

export default function Navigation() {
  const { openModal } = useModal()
  const { isAuthenticated, signOut } = useSession()

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
          {isAuthenticated ? 
            <Button small onClick={signOut} text='Sign Out' />
          : 
            <Button small onClick={()=>openModal(<SignInForm />)} text='Sign In' />
          }
        </li>
      </ul>
    </div>
  );
};