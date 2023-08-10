const fetchPlaylists = async ({ search }) => {
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
    return playlistsResults
  } catch (error) {
    console.error('Error al traer los Playlist', error)
  }
}

export default fetchPlaylists
