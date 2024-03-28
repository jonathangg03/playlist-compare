import { useState } from 'react'

const useToggle = ({ initial }) => {
  const [toggle, setToggle] = useState(initial)

  const updateToggle = () => {
    setToggle((prevValue) => !prevValue)
  }

  return { toggle, updateToggle }
}

export default useToggle
