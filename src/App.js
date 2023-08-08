import { useState } from 'react'
import './App.css'
import ComparisonResults from './components/ComparisonResults'
import PlaylistResults from './components/PlaylistsResults'
import PlaylistToCompare from './components/PlaylistToCompare'
import UsernameForm from './components/UsernameForm'
import Title from './components/Title'

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
  const [showInfoMessage, setShowInfoMessage] = useState('false')
  // const [fetchStatus, setFetchStatus] = useState()

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
    setPlaylistToCompare([])
  }

  return (
    <div className='App'>
      <Title
        showInfoMessage={showInfoMessage}
        setShowInfoMessage={setShowInfoMessage}
      />
      <UsernameForm
        search={search}
        setSearch={setSearch}
        setPlaylists={setPlaylists}
      />
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
