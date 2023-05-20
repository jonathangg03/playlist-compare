import './index.css'

const ComparisonResults = ({
  comparisonA,
  comparisonB,
  namePlaylistA,
  namePlaylistB
}) => {
  return (
    <div>
      <h2 className='compare-title'>Resultados:</h2>
      <div className='results-container'>
        <h3>
          Canciones de la playlist {namePlaylistA} que no están en la playlist{' '}
          {namePlaylistB}
        </h3>
        <div className='container'>
          {comparisonA.map((track) => {
            return (
              <div className='card'>
                <figure className='card-image-container'>
                  <img
                    src={track.track.album.images[0].url}
                    alt={track.track.name}
                  />
                </figure>
                <p className='card-name'>{track.track.name}</p>
              </div>
            )
          })}
        </div>
        <h3>
          Canciones de la playlist {namePlaylistB} que no están en la playlist{' '}
          {namePlaylistA}
        </h3>
        <div className='container'>
          {comparisonB.map((track) => {
            return (
              <div className='card'>
                <figure className='card-image-container'>
                  <img
                    src={track.track.album.images[0].url}
                    alt={track.track.name}
                  />
                </figure>
                <p className='card-name'>{track.track.name}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ComparisonResults
