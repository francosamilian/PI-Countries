import React from "react";
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { countryDetail } from "../actions";
import { useEffect } from "react";
import s from './Detail.module.css';

export default function Detail(props) {

const dispatch = useDispatch();

useEffect(() => {
    dispatch(countryDetail(props.match.params.id));
}, [props.match.params.id])

const country = useSelector(state => state.countryDetail);      // me traigo el estado countryDetail (es un objeto)

return (
    <div>
        {
            Object.entries(country).length>0?       //pregunto si el objeto ubicado dentro del estado countryDetail tiene algo
            <div className={s.mainContainer}>
                <div className={s.countryContainer}>
                    {/* <Link><button>Next</button></Link> */}
                    <h1 className={s.countryName}>{country.name}</h1>
                    <img className={s.img} src={country.image}/>
                    <h2 className={s.info} >Capital: {country.capital ? country.capital.substring(1, country.capital.length -1) : 'This country has no capital'}</h2>       {/* lo pongo así para que no me traiga las "{}" que vienen con la api */}
                    <h2 className={s.info} >Continent: {country.continent}</h2>
                    <h2 className={s.info} >Subregion: {country.subRegion ? country.subRegion : 'This country has no subregion'}</h2>       {/* algunos paises no tienen subregion */}
                    <h2 className={s.info} >Population: {country.population}</h2>
                    <h2 className={s.info} >Area: {country.area}</h2>
                    <h2 className={s.info} >ID: {country.id}</h2>
                </div>
                <div className={s.activityContainer}>
                    <h4 className={s.activities} >Activities: </h4>
                    {country.activities.length>0?  country.activities?.map(a =>
                    <div>
                        {/* en caso de que haya activities, hago un map y muestro toda su info*/}
                        <h2 className={s.actInfo} >Name: {a.name}</h2>
                        <h2 className={s.actInfo} >Seasons: {a.seasons}</h2> 
                        <h2 className={s.actInfo} >Difficulty: {a.difficulty}</h2>
                        <h2 className={s.duration} >Duration: {a.duration}</h2>
                    </div> ): <div> <p className={s.noAct} >This country has no activities</p></div>}
                    <Link to='/home'><button className={s.btn} >Back</button></Link>
                </div> 
            </div>
            : <p>Loading...</p>
        }
    </div>
)

}