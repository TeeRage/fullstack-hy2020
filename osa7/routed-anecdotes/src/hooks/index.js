/**
* Uuden anekdootin luomiseen käytettävän lomakkeen käyttö useField custom-hookin avulla.
*/
import { useState } from 'react'

export const useField = () => {

  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    reset,
    bind: {
      value,
      onChange
    }
  }
}