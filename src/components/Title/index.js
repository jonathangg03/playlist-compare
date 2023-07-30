const Title = ({ showInfoMessage, setShowInfoMessage }) => {
  return (
    <div className='title'>
      <h1>Ingresa tu ID de usuario</h1>
      <img
        src='https://icon-library.com/images/information-icon-white/information-icon-white-6.jpg'
        alt=''
        onMouseEnter={() => setShowInfoMessage('true')}
        onMouseLeave={() => setShowInfoMessage('false')}
        className='title-info--image'
      />
      <div className='info-message' showmessage={showInfoMessage}>
        <p>
          El nombre de usuario lo puedes encontrar en la aplicación de Spotify
          en: Foto de Perfil en la esquina superior derecha {'>'} Cuenta {'> '}{' '}
          Nombre de usuario.
        </p>
      </div>
    </div>
  )
}

export default Title
