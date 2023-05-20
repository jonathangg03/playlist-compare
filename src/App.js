import { useState, useEffect } from 'react'
import './App.css'
import PlaylistResults from './components/PlaylistsResults'
import PlaylistToCompare from './components/PlaylistToCompare'
import UsernameForm from './components/UsernameForm'

const authorizationHeader =
  'BQCbzi6tsq7y86fAskkpwU983vraQfxrk9ojxf9GLqF1og1z0jcESbpRt4-aXXqpXaVC54ScRlygGmvQJT2fKx_LFe_k6VVwzpCi7V7zRi0wuM-rA5gz'

function App() {
  const [playlists, setPlaylists] = useState([])
  const [search, setSearch] = useState('joniux03')
  const [playlistToCompare, setPlaylistToCompare] = useState([])
  const [tracksA, setTracksA] = useState([])
  const [tracksB, setTracksB] = useState([])
  const [comparisonA, setComparisonA] = useState([])
  const [comparisonB, setComparisonB] = useState([])

  const handleCompare = async () => {
    const tracksAIds = tracksA.map((track) => track.track.id)
    const tracksBIds = tracksB.map((track) => track.track.id)
    const filterA = tracksA.filter(
      (track) => !tracksBIds.includes(track.track.id)
    )
    const filterB = tracksB.filter(
      (track) => !tracksAIds.includes(track.track.id)
    )

    setComparisonA(filterA)
    setComparisonB(filterB)
  }

  return (
    <div className='App'>
      <h1>Ingresa tu ID de usuario</h1>
      <UsernameForm
        authorizationHeader={authorizationHeader}
        search={search}
        setSearch={setSearch}
        setPlaylists={setPlaylists}
      />
      {playlists && (
        <PlaylistResults
          playlists={playlists}
          setPlaylistToCompare={setPlaylistToCompare}
          playlistToCompare={playlistToCompare}
          authorizationHeader={authorizationHeader}
          tracksA={tracksA}
          setTracksA={setTracksA}
          tracksB={tracksB}
          setTracksB={setTracksB}
        />
      )}
      {playlistToCompare.length > 0 && (
        <PlaylistToCompare
          setPlaylistToCompare={setPlaylistToCompare}
          playlistToCompare={playlistToCompare}
          tracksA={tracksA}
          tracksB={tracksB}
        />
      )}
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
    </div>
  )
}

export default App
