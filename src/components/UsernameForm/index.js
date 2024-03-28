import { useState } from 'react'
import getAuthToken from '../../services/getAuthToken'
import getPlaylists from '../../services/getPlaylists'
import UsernameInput from '../UsernameInput'
import './index.css'

const UsernameForm = ({ setPlaylists }) => {
  const [search, setSearch] = useState('')

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
  }

  return (
    <form onSubmit={handleSearchPlaylists}>
      <UsernameInput
        type='text'
        name='search'
        placeholder='ID de usuario...'
        search={search}
        className='input-userCode'
        setSearch={setSearch}
      />
      <button className='button success'>Buscar</button>
    </form>
  )
}

export default UsernameForm
