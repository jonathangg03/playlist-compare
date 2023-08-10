const UsernameInput = ({ search, setSearch }) => {
  const handleUsernameSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <input
      type='text'
      name='search'
      placeholder='ID de usuario...'
      onChange={handleUsernameSearch}
      value={search}
      className='input-userCode'
    />
  )
}

export default UsernameInput
