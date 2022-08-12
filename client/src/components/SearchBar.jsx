import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountryByName } from "../actions";
import s from './SearchBar.module.css'

export default function SearchBar({setCurrentPage}) {

const dispatch = useDispatch();
const [name, setName] = useState('');


function handleSubmit(e) {
    e.preventDefault();
    if(name === '') return alert('You must enter a country'); 
    setCurrentPage(1);
    dispatch(getCountryByName(name));
    setName(''); 
}

function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
}

return (
    <div>                              
        <form className={s.form} onSubmit={e => handleSubmit(e)}>
            <input className={s.input} type="text" placeholder="Search country by name..." name='input' value={name} onChange={e => handleInputChange(e)}/>
            <input className={s.btn} type="submit" name='btn' value='Search' />
        </form>
    </div>
)

}