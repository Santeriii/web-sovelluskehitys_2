import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import Kartta from './Kartta'

const Kaupunkipyorat = () => {
    const [pyorat, setPyorat] = useState([])
    const [koordinaattiX, setKoordinaattiX] = useState('')
    const [koordinaattiY, setKoordinaattiY] = useState('')
    const [asematHidden, setAsematHidden] = useState(true)

    useEffect(() => {
        async function fetchdata() {
            await axios
                .get('https://services1.arcgis.com/sswNXkUiRoWtrx0t/arcgis/rest/services/Helsingin_ja_Espoon_kaupunkipy%C3%B6r%C3%A4asemat/FeatureServer/0/query?where=1%3D1&outFields=Kapasiteet,Osoite&outSR=4326&f=json')
                .then(response => {
                    setPyorat(response.data)
                })}
        fetchdata()
    }, [])

    const asetaKoordinaatit = (x, y) => {
        setKoordinaattiX(x)
        setKoordinaattiY(y)
        console.log(koordinaattiX, koordinaattiY)
        naytaAsemat()
    }

    const naytaAsemat = () => {
        setAsematHidden(!asematHidden)
    }

    return (
        <div>
            {console.log(pyorat)}
            {asematHidden &&
                <div>
                    <Button onClick={() => naytaAsemat()}>Näytä asemat</Button>
                    <Kartta Y={koordinaattiY} X={koordinaattiX}/>
                </div>
            }
            {!asematHidden &&
            pyorat.features.map(pyora => {
                return (
                    <li>
                        Asema
                        : <Button onClick={() => asetaKoordinaatit(pyora.geometry.x, pyora.geometry.y)}>{pyora.attributes.Osoite}</Button><br/>
                        Kapasiteetti: {pyora.attributes.Kapasiteet}
                    </li>
                )
            })}
        </div>
    )
}

export default Kaupunkipyorat