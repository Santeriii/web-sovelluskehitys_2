import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = ()  => {
  const [tyontekijat, setTyontekijat] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/tyontekijat')
      .then(response => {
        setTyontekijat(response.data)
      })
  }, [])

  return (
    <div>
      {tyontekijat.map(tyontekija => {
        return (
          <li>
            Nimi: {tyontekija.firstName} {tyontekija.lastName}<br/>
            {tyontekija.numbers.map(number => {
              return (
                <>
                  Numero (koti): {number.home}
                  {number.work ? <><br/>Numero (työ): {number.work}</> : null}
                </>
              )
            })}
            <br/>
            Osoite: {tyontekija.address}
          </li>
        )
      })}
    </div>
  )
}

export default App