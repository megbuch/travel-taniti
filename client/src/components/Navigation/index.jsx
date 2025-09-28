import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useModal, useSession } from '../../hooks'
import { ContactForm, SignInForm, Button, CreateAccountForm } from '../'
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import './styles.scss'

export default function Navigation() {
  const navigate = useNavigate()
  const { me } = useSession()
  const { openModal } = useModal()
  const { isAuthenticated, signOut } = useSession()
  const [showExpandedMenu, setShowExpandedMenu] = useState(false) // For desktop user menu
  const [showMobileNavMenu, setShowMobileNavMenu] = useState(false)

  const goToAdminDashboard = () => {
    if (me.role !== 'admin') return
    navigate('/admin-dashboard')
    setShowMobileNavMenu(false)
  }

  const goToTravelDashboard = () => {
    navigate('/travel-dashboard')
    setShowMobileNavMenu(false)
  }

  const hideMobileNav = () => {
    setShowMobileNavMenu(false)
  }

  const open = component => {
    openModal(component)
    setShowMobileNavMenu(false)
  }

  const logOut = () => {
    signOut()
    setShowMobileNavMenu(false)
  }
  
  return (
    <div className='navigation-comp'>
      <div className='menu'>
        <div className='mobile-nav-toggle'>
          <Button 
            backgroundless 
            icon={showMobileNavMenu ? <CloseIcon /> : <MenuIcon />} 
            onClick={() => setShowMobileNavMenu(!showMobileNavMenu)} 
          />
        </div>
        <ul className='desktop-nav-links'>
          <li className='link'>
            <Link to='/'>Home</Link>
          </li>
          <li className='link'>
            <Link to='/activities'>Activities</Link>
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
          <li className='link'>
            <Link onClick={()=>open(<ContactForm />)}>Contact</Link>
          </li>
        </ul>
        <div className='user-menu desktop-user-menu'>
          {isAuthenticated 
            ? 
              <Button backgroundless icon={<KeyboardArrowDownIcon />} text={`${me?.firstName} ${me?.lastName}`} onClick={()=>setShowExpandedMenu(!showExpandedMenu)} />
            :
              <>
                <Button tall text='Sign In' onClick={()=>open(<SignInForm />)} />
                <Button tall text='Get Started' onClick={()=>open(<CreateAccountForm />)} />
              </>
          }
        </div>
      </div>
      {isAuthenticated && showExpandedMenu && 
        <ul className='col expanded-menu'>
          {me?.role === 'admin' && 
            <li>
              <Button backgroundless icon={<AdminPanelSettingsIcon />} text='Admin Dashboard' onClick={goToAdminDashboard} />
            </li>
          }
          <li>
            <Button backgroundless icon={<AirplaneTicketIcon />} text='Travel Dashboard' onClick={goToTravelDashboard} />
          </li>
          <li>
            <Button backgroundless icon={<LogoutIcon />} text='Sign Out' onClick={signOut} />
          </li>
        </ul>
      }
      {showMobileNavMenu && (
        <div className='mobile-nav-overlay'>
          <ul className='mobile-nav-items col'>
            <li>
              <Link to='/' onClick={hideMobileNav}>Home</Link>
            </li>
            <li>
              <Link to='/activities' onClick={hideMobileNav}>Activities</Link>
            </li>
            <li>
              <Link to='/dining' onClick={hideMobileNav}>Dining</Link>
            </li>
            <li>
              <Link to='/lodging' onClick={hideMobileNav}>Lodging</Link>
            </li>
            <li>
              <Link to='/transportation' onClick={hideMobileNav}>Transportation</Link>
            </li>
            <li>
              <Link onClick={()=>open(<ContactForm />)}>Contact</Link>
            </li>
            
            <li className='mobile-user-section'>
              {isAuthenticated ? (
                <ul>
                  {me?.role === 'admin' && 
                    <li>
                      <Button backgroundless icon={<AdminPanelSettingsIcon />} text='Admin Dashboard' onClick={goToAdminDashboard} />
                    </li>
                  }
                  <li>
                    <Button backgroundless icon={<AirplaneTicketIcon />} text='Travel Dashboard' onClick={goToTravelDashboard} />
                  </li>
                  <li>
                    <Button backgroundless icon={<LogoutIcon />} text='Sign Out' onClick={logOut} />
                  </li>
                </ul>
              ) : (
                <ul>
                  <li>
                    <Button backgroundless text='Sign In' onClick={()=>open(<SignInForm />)} />
                  </li>
                  <li>
                    <Button backgroundless text='Get Started' onClick={()=>open(<CreateAccountForm />)} />
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};