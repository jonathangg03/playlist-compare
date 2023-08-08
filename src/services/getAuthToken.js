const handleAuthToken = async () => {
  const data = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'grant_type=client_credentials&client_id=c94f1348346c4072acda5a3922578a51&client_secret=e424ce3b9643414daf5fa53cd89da763'
  })
  const result = await data.json()
  localStorage.setItem('accessToken', result.access_token)
}

export default handleAuthToken
