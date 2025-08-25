import './styles.scss'

export default function Button(props) {
  const { 
    small,
    short,
    inverted,
    backgroundless,
    neutral,
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
        ${small && 'small'} 
        ${short && 'short'} 
        ${backgroundless && 'backgroundless'}
        ${neutral && 'neutral'}`
      }
    >
      {icon && <span className={`icon ${small && 'small-icon'}`}>{icon}</span>}
      {text && <span>{text}</span>}
    </button>
  )
}