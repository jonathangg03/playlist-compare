import { useState, useEffect } from 'react'
import './App.css'
import ComparisonResults from './components/ComparisonResults'
import PlaylistResults from './components/PlaylistsResults'
import PlaylistToCompare from './components/PlaylistToCompare'
import UsernameForm from './components/UsernameForm'

const authorizationHeader =
  'BQDAa7nPoQWh5Co8zlVCv10Ep8sGAAIfD-Fh1MwmCx2IywHy_OM1waocB7VQp4wohPz2wrKpOG2p5lUe5sYUjMc3XbVsTH6-cd1-95m4XMG4xlgkklso'

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
          handleCompare={handleCompare}
        />
      )}
      <ComparisonResults
        comparisonA={comparisonA}
        comparisonB={comparisonB}
        namePlaylistA={playlistToCompare[0].name}
        namePlaylistB={playlistToCompare[1].name}
      />
      {/* {comparisonA.length > 0 ||
        (comparisonB.length > 0 && (

        ))} */}
    </div>
  )
}

export default App
