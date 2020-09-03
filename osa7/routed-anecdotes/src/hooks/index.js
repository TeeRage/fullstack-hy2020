/**
* Uuden anekdootin luomiseen käytettävän lomakkeen käyttö useField custom-hookin avulla.
* @type Lomakkeen (form) input kentän tyyppi (text/date/number...)
*/
import { useState } from 'react'

export const useField = (type) => {

  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset  
  }
}