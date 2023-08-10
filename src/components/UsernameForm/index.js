import './index.css'
import getAuthToken from '../../services/getAuthToken'
import getPlaylists from '../../services/getPlaylists'

const UsernameForm = ({ search, setSearch, setPlaylists }) => {
  // const fetchPlaylists = async () => {
  //   try {
  //     const result = await fetch(
  //       `https://api.spotify.com/v1/users/${search}/playlists`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('accessToken')}`
  //         }
  //       }
  //     )

  //     const playlistsResults = await result.json()
  //     return playlistsResults
  //   } catch (error) {
  //     console.error('Error al traer los Playlist', error)
  //   }
  // }

  const handleSearchPlaylists = async (event) => {
    event.preventDefault()
    if (!localStorage.getItem('accessToken')) {
      await getAuthToken()
    }

    let playlistsResults = await getPlaylists({ search })
    if (
      playlistsResults.error &&
      playlistsResults.error.message === 'The access token expired'
    ) {
      await getAuthToken() // If fail, ask token and fetch playlistsResults again
      playlistsResults = getPlaylists({ search }) //Needs to be tested
    } else {
      setPlaylists(playlistsResults.items)
    }

    // setPlaylists(results.items)
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
