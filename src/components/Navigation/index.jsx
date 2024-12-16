import { Link } from 'react-router-dom'
import './styles.scss'

export default function Navigation() {
  return (
    <div className='navigation'>
      <p>Logo</p>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/activities'>Activities</Link>
        </li>
        <li>
          <Link to='/dining'>Dining</Link>
        </li>
        <li>
          <Link to='/lodging'>Lodging</Link>
        </li>
        <li>
          <Link to='/transportation'>Transportation</Link>
        </li>
      </ul>
      <button>Contact</button>
    </div>
  );
};