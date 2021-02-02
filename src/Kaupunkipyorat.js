import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import Kartta from './Kartta'

const Kaupunkipyorat = () => {
    const [pyorat, setPyorat] = useState([])
    const [koordinaattiX, setKoordinaattiX] = useState('')
    const [koordinaattiY, setKoordinaattiY] = useState('')
    const [asematHidden, setAsematHidden] = useState(true)
    const [saatiedot, setSaatiedot] = useState([])

    useEffect(() => {
        async function fetchdata() {
            await axios
                .get('https://services1.arcgis.com/sswNXkUiRoWtrx0t/arcgis/rest/services/Helsingin_ja_Espoon_kaupunkipy%C3%B6r%C3%A4asemat/FeatureServer/0/query?where=1%3D1&outFields=Kapasiteet,Osoite&outSR=4326&f=json')
                .then(response => {
                    setPyorat(response.data)
                })
        }

        async function fetchweatherdata() {
            await axios
                .get('http://api.openweathermap.org/data/2.5/weather?q=Helsinki,fin&APPID=88854243fc4a1b7efc6c0a91b1f73c99')
                .then(response => {
                    setSaatiedot(response.data)
                })
        }
        fetchweatherdata()
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
            {console.log(saatiedot)}
            {asematHidden &&
                <div>
                    <Button onClick={() => naytaAsemat()}>Näytä asemat</Button>
                    <Kartta Y={koordinaattiY} X={koordinaattiX}/>
                    <br/>
                    <div style={{fontWeight: 'bold', fontSize: '400%'}}>{saatiedot.name} {saatiedot.main.temp - 272.15}°C</div>
                    {saatiedot.weather[0].description === 'snow' &&
                        <img alt='weather' src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYTR5YkluSiAnr6pDRlrwJ415N_78D5xbXYw&usqp=CAU'} />
                    }
                    {saatiedot.weather[0].description === 'light snow' &&
                        <img alt='weather' src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYTR5YkluSiAnr6pDRlrwJ415N_78D5xbXYw&usqp=CAU'} />
                    }
                    {saatiedot.weather[0].description === 'clear sky' &&
                        <img alt='weather' src={'https://cdn3.iconfinder.com/data/icons/weather-and-weather-forecast/32/sunny-512.png'} />
                    }
                    {saatiedot.weather[0].description === 'overcast clouds' &&
                        <img alt='weather' src={'https://icons.iconarchive.com/icons/icons8/ios7/256/Weather-Clouds-icon.png'} />
                    }
                    {saatiedot.weather[0].description === 'broken clouds' &&
                        <img alt='weather' src={'https://icons.iconarchive.com/icons/icons8/ios7/256/Weather-Clouds-icon.png'} />
                    }
                    {saatiedot.weather[0].description === 'fog' &&
                        <img alt='weather' src={'https://icons-for-free.com/iconfiles/png/512/fog+forecast+weather+icon-1320183299215753070.png'} />
                    }
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