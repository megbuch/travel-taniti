import './styles.scss'

export default function Button(props) {
  const { 
    outline, 
    small, 
    onClick, 
    text, 
    type 
  } = props

  return (
    <button 
      type={type}
      onClick={onClick} 
      className={`button ${outline && 'button-outline'} ${small && 'button-small'}`}
    >
      {text}
    </button>
  )
}