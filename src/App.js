import { useState } from 'react'
import './App.css'
import ComparisonResults from './components/ComparisonResults'
import PlaylistResults from './components/PlaylistsResults'
import PlaylistToCompare from './components/PlaylistToCompare'
import UsernameForm from './components/UsernameForm'
import Title from './components/Title'
import titleHelp from './utils/text'

const fetchStates = {
  success: 1,
  error: -1,
  initial: 0,
  loading: 2
}

function App() {
  const [playlists, setPlaylists] = useState([])
  const [playlistToCompare, setPlaylistToCompare] = useState([])
  const [tracksA, setTracksA] = useState([])
  const [tracksB, setTracksB] = useState([])
  const [comparisonA, setComparisonA] = useState([])
  const [comparisonB, setComparisonB] = useState([])
  // const [fetchStatus, setFetchStatus] = useState()

  const handleClear = () => {
    setTracksA([])
    setTracksB([])
    setPlaylistToCompare([])
  }

  return (
    <div className='App'>
      <Title
        icon={
          'https://icon-library.com/images/information-icon-white/information-icon-white-6.jpg'
        }
        infoMessage={titleHelp}
      />
      <UsernameForm setPlaylists={setPlaylists} />
      {playlists && (
        <PlaylistResults
          playlists={playlists}
          setPlaylistToCompare={setPlaylistToCompare}
          playlistToCompare={playlistToCompare}
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
          setComparisonA={setComparisonA}
          setComparisonB={setComparisonB}
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
