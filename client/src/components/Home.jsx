import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getActivities, getCountries } from '../actions';
import {Link} from 'react-router-dom';
import Card from './Card';

export default function Home() {

const dispatch = useDispatch();
const allCountries = useSelector((state) => state.countries);
const allActivities = useSelector((state) => state.activities);

useEffect(() => {
    dispatch(getCountries())
    dispatch(getActivities())
}, [dispatch]);

function handleClick(e) {
    e.preventDefault();
    dispatch(getCountries());
};

let obj = {}
const filteredActivities = allActivities.filter(a => obj[a.name] ? false : obj[a.name] = true);
console.log(allActivities)
console.log(filteredActivities);


return (
    <div>
        <Link to='/activities'>
            <button>Agregar actividad</button>
        </Link>
            <h1>Paises</h1>
            <button onClick={e => handleClick(e)}>Volver a cargar</button>
            <div>
                <select>
                    <option value='ascendente'>Ascendente</option>
                    <option value='descendente'>Descendente</option>
                </select>
                <select>
                    <option value='todos'>Todos</option>
                    <option value='africa'>África</option>
                    <option value='america'>América</option>
                    <option value='antartica'>Antárcica</option>
                    <option value='asia'>Asia</option>
                    <option value='europa'>Europa</option>
                    <option value='oceania'>Oceanía</option>
                </select>
                <select>
                    <option value='menosDe1'>Menos de 1 millón</option>
                    <option value='entre1y10'>Entre 1 y 10 millones</option>
                    <option value='entre10y30'>Entre 10 y 30 millones</option>
                    <option value='entre30y60'>Entre 30 y 60 millones</option>
                    <option value='masDe60'>Más de 60 millones</option>
                </select>
                <select>
                    {
                        
                        filteredActivities?.map((a) => {
                            return (
                                <option value={a.id}>{a.name[0].toUpperCase() + a.name.slice(1)}</option>
                            )
                        })
                    }
                </select>
                <div>
                {
                    allCountries?.map((c) => {
                        return (
                            <div>
                                <Link to={'/home/' + c.id}>
                                    <Card name={c.name} image={c.image} continent={c.continent} key={c.id}/>                                
                                </Link>
                            </div>
                        )
                    })
                }
                </div>
            </div>
    </div>
)

}