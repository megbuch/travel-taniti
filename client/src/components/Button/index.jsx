import './styles.scss'

export default function Button(props) {
  const { 
    small,
    short,
    inverted,
    backgroundless,
    border,
    onClick, 
    text, 
    icon,
    type 
  } = props

  return (
    <button 
      type={type}
      onClick={onClick} 
      className={`button 
        ${border && 'border'} 
        ${inverted && 'inverted'} 
        ${small && 'small'} 
        ${short && 'short'} 
        ${backgroundless && 'backgroundless'}
      `}
    >
      {icon && <span className={`icon ${small && 'small-icon'}`}>{icon}</span>}
      {text && <span>{text}</span>}
    </button>
  )
}