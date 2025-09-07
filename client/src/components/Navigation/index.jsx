import { Link, useNavigate } from 'react-router-dom'
import { useModal, useSession } from '../../hooks'
import { ContactForm, SignInForm, Button, CreateAccountForm } from '../'
import DashboardIcon from '@mui/icons-material/Dashboard';
import MessageIcon from '@mui/icons-material/Message';
import './styles.scss'

export default function Navigation() {
  const navigate = useNavigate()
  const { openModal } = useModal()
  const { isAuthenticated, signOut } = useSession()

  return (
    <div className='navigation'>
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
      </ul>
      <div className='button-row row'>
        <Button backgroundless icon={<MessageIcon />} onClick={()=>openModal(<ContactForm />)} />
        {isAuthenticated ? 
          <div className='row'>
            <Button backgroundless icon={<DashboardIcon />} onClick={()=>navigate('/traveler-dashboard')} />
            <Button text='Sign Out' onClick={signOut} />
          </div>
        : 
          <>
            <Button tall text='Sign In' onClick={()=>openModal(<SignInForm />)} />
            <Button tall text='Get Started' onClick={()=>openModal(<CreateAccountForm />)} />
          </>
        }
      </div>
    </div>
  );
};