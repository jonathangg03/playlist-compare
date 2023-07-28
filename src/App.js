import { useState } from 'react'
import './App.css'
import ComparisonResults from './components/ComparisonResults'
import PlaylistResults from './components/PlaylistsResults'
import PlaylistToCompare from './components/PlaylistToCompare'
import UsernameForm from './components/UsernameForm'

const fetchStates = {
  success: 1,
  error: -1,
  initial: 0,
  loading: 2
}

function App() {
  const [playlists, setPlaylists] = useState([])
  const [search, setSearch] = useState('joniux03')
  const [playlistToCompare, setPlaylistToCompare] = useState([])
  const [tracksA, setTracksA] = useState([])
  const [tracksB, setTracksB] = useState([])
  const [comparisonA, setComparisonA] = useState([])
  const [comparisonB, setComparisonB] = useState([])
  const [fetchStatus, setFetchStatus] = useState()
  const [accessToken, setAccessToken] = useState('')

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

  const handleClear = () => {
    setTracksA([])
    setTracksB([])
  }

  const handleAuthToken = async () => {
    const data = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'grant_type=client_credentials&client_id=c94f1348346c4072acda5a3922578a51&client_secret=e424ce3b9643414daf5fa53cd89da763'
    })
    const result = await data.json()
    localStorage.setItem('accessToken', result.access_token)
  }

  return (
    <div className='App'>
      <h1>Ingresa tu ID de usuario</h1>
      <UsernameForm
        search={search}
        setSearch={setSearch}
        setPlaylists={setPlaylists}
        handleAuthToken={handleAuthToken}
      />
      {playlists && (
        <PlaylistResults
          playlists={playlists}
          setPlaylistToCompare={setPlaylistToCompare}
          playlistToCompare={playlistToCompare}
          authorizationHeader={accessToken}
          tracksA={tracksA}
          setTracksA={setTracksA}
          tracksB={tracksB}
          setTracksB={setTracksB}
          handleAuthToken={handleAuthToken}
        />
      )}
      {playlistToCompare.length > 0 && (
        <PlaylistToCompare
          setPlaylistToCompare={setPlaylistToCompare}
          playlistToCompare={playlistToCompare}
          tracksA={tracksA}
          tracksB={tracksB}
          handleCompare={handleCompare}
          handleClear={handleClear}
        />
      )}
      {(comparisonA.length > 0 || comparisonB.length > 0) && (
        <ComparisonResults
          comparisonA={comparisonA}
          comparisonB={comparisonB}
          namePlaylistA={playlistToCompare[0].name}
          namePlaylistB={playlistToCompare[1].name}
        />
      )}
    </div>
  )
}

export default App
