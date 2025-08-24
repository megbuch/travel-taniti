import { Link } from 'react-router-dom'
import { useModal } from '../../hooks'
import { ContactForm } from '../'
import './styles.scss'

export default function Footer() {
  const { openModal } = useModal();

  return (
    <div className='footer'>
      <p className='subtitle'>
        Taniti Tourism Main Office<br />
        720 Palea Avenue<br />
        Taniti City, Taniti<br /><br />
        📞 &nbsp; (772) 891-9700<br />
        📧 &nbsp; inquiries@traveltaniti.com
      </p>
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
        <li className='link'>
          <Link to='' onClick={()=>openModal(<ContactForm />)} className='link'>Contact Us</Link>
        </li>
        <li className='link'>
          <Link to='/references' className='link'>References</Link>
        </li>
      </ul>
    </div>
  );
};