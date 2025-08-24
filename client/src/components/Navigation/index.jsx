import { Link, useNavigate } from 'react-router-dom'
import { useModal, useSession } from '../../hooks'
import { ContactForm, SignInForm, Button, CreateAccountForm } from '../'
import { LuMessageSquareMore, LuLayoutDashboard } from "react-icons/lu";
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
        <Button backgroundless onClick={()=>openModal(<ContactForm />)} icon={<LuMessageSquareMore />}/>
        {isAuthenticated ? 
          <div className='row'>
            <Button backgroundless onClick={()=>navigate('/traveler-dashboard')} icon={<LuLayoutDashboard />} />
            <Button small onClick={signOut} text='Sign Out' />
          </div>
        : 
          <>
            <Button tall onClick={()=>openModal(<SignInForm />)} text='Sign In' />
            <Button tall onClick={()=>openModal(<CreateAccountForm />)} text='Get Started' />
          </>
        }
      </div>
    </div>
  );
};