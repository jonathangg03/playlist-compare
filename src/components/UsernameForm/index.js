import './index.css'

const UsernameForm = ({
  authorizationHeader,
  search,
  setSearch,
  setPlaylists
}) => {
  const handleSearchPlaylists = async (event) => {
    event.preventDefault()
    const result = await fetch(
      `https://api.spotify.com/v1/users/${search}/playlists`,
      {
        headers: {
          Authorization: `Bearer ${authorizationHeader}`
        }
      }
    )

    const playlistsResults = await result.json()
    setPlaylists(playlistsResults.items)
  }

  const handleChangeSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <form onSubmit={handleSearchPlaylists}>
      <input
        type='text'
        name='search'
        onChange={handleChangeSearch}
        value={search}
        className='input-userCode'
      />
      <button className='button'>Buscar</button>
    </form>
  )
}

export default UsernameForm
