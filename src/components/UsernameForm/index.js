import './index.css'
import getAuthToken from '../../services/getAuthToken'

const UsernameForm = ({ search, setSearch, setPlaylists }) => {
  const fetchPlaylists = async () => {
    try {
      const result = await fetch(
        `https://api.spotify.com/v1/users/${search}/playlists`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        }
      )

      const playlistsResults = await result.json()
      setPlaylists(playlistsResults.items)
      return playlistsResults
    } catch (error) {
      console.log('Error al traer los Playlist', error)
    }
  }

  const handleSearchPlaylists = async (event) => {
    event.preventDefault()
    if (!localStorage.getItem('accessToken')) {
      await getAuthToken()
    }

    let results = await fetchPlaylists()
    console.log('PR', results)
    if (results.error && results.error.message === 'The access token expired') {
      await getAuthToken() // If fail, ask token and fetch results again
      results = fetchPlaylists() //Needs to be tested
    }

    setPlaylists(results.items)
  }

  const handleChangeSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <form onSubmit={handleSearchPlaylists}>
      <input
        type='text'
        name='search'
        placeholder='ID de usuario...'
        onChange={handleChangeSearch}
        value={search}
        className='input-userCode'
      />
      <button className='button success'>Buscar</button>
    </form>
  )
}

export default UsernameForm
