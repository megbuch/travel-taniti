import './styles.scss'

export default function Button(props) {
  const { 
    smallText, 
    short,
    inverted,
    backgroundless,
    withBorder,
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
        ${withBorder && 'with-border'} 
        ${inverted && 'inverted'} 
        ${smallText && 'small-text'} 
        ${short && 'short'} 
        ${backgroundless && 'backgroundless'} 
        ${navigation && 'navigation'}`
      }
    >
      {icon && <span className='icon'>{icon}</span>}
      {text && <span>{text}</span>}
    </button>
  )
}