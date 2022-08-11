import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountryByName } from "../actions";
// import {Home} from './Home.jsx'
import s from './SearchBar.module.css'

export default function SearchBar({setCurrentPage}) {

const dispatch = useDispatch();
const [name, setName] = useState('');


function handleSubmit(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(getCountryByName(name));
    setName(''); 
    // console.log(name);
}

function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
}

return (
    <div>
        {/* <input type="text" placeholder="Search by name..." onChange={e => handleInputChange(e)}/>         // así no me funciona el setName('') 
        <button type="submit" onClick={e => handleSubmit(e)}>Search</button> */}                                
        <form className={s.form} onSubmit={e => handleSubmit(e)}>
            <input className={s.input} type="text" placeholder="Search country by name..." value={name} onChange={e => handleInputChange(e)}/>
            <input className={s.btn} type="submit" value='Search' />
        </form>
    </div>
)

}