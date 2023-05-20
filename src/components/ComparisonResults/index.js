const ComparisonResults = ({ comparisonA, comparisonB }) => {
  return (
    <div>
      <h2 className='compare-title'>Resultados:</h2>
      <div className='results-container'>
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
