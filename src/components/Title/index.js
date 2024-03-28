import useToggle from '../../hooks/useToggle'

const Title = ({ infoMessage, icon }) => {
  const { toggle, updateToggle } = useToggle(false)

  return (
    <div className='title'>
      <h1>Ingresa tu ID de usuario</h1>
      {icon && (
        <img
          src={icon}
          alt=''
          onMouseEnter={updateToggle}
          onMouseLeave={updateToggle}
          className='title-info--image'
        />
      )}
      {toggle && (
        <div className='info-message'>
          <p>{infoMessage}</p>
        </div>
      )}
    </div>
  )
}

/*
  ? Abstract validations
  ? Dont use toggle like string
*/

export default Title
