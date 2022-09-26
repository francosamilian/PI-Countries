import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getCountries, filterByContinent, filterByActivity, orderByName, getActivities } from '../actions';
import {Link} from 'react-router-dom';
import Card from './Card';
import Paging from './Paging';
import SearchBar from './SearchBar';
import s from './Home.module.css';

export default function Home() {

const dispatch = useDispatch();
const allCountries = useSelector(state => state.countries);
const allActivities = useSelector(state => state.activities);
const [currentPage, setCurrentPage] = useState(1);
const [countriesPerPage, setCountriesPerPage] = useState(10);
let indexOfLastCountry = (currentPage - 1) * countriesPerPage + 9;
let indexOfFirstCountry = 0;
if (currentPage > 1) indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry);
const [order, setOrder] = useState(''); 

const paging = (pageNumber) => {
    setCurrentPage(pageNumber);
}

useEffect(() => {
    dispatch(getCountries())
    dispatch(getActivities())
}, [dispatch]);

let obj = {};               //esto es para que no me aparezca muchas veces la misma actividad en el filtro si es que existe en muchos paises
const filteredActivities = allActivities.filter(a => obj[a.name] ? false : obj[a.name] = true);

function handleOrder(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(orderByName(e.target.value));
    setOrder(`Ordered ${e.target.value}`);
}

function handleReload(e) {
    e.preventDefault();
    setCurrentPage(1);
    document.getElementById('selectOrder').value = 'select';
    document.getElementById('selectContinent').value = 'all';
    document.getElementById('selectActivity').value = 'all';
    dispatch(getCountries());
};

function handleFilterByContinent(e) {
    setCurrentPage(1);
    dispatch(filterByContinent(e.target.value));
}

function handleFilterByActivity(e) {
    setCurrentPage(1);
    dispatch(filterByActivity(e.target.value));
}

return (
    <div className={s.container1Page}>
        <div className={s.navBar}>
            <h1 className={s.title} onClick={e => handleReload(e)}> Henry Countries</h1>
            <SearchBar setCurrentPage={setCurrentPage}/>
            <Link to='/activities'>
                <button className={s.btnActivity}>Create activity</button>
            </Link>
        </div>
        <div className={s.mainContainer}>
            <div className={s.filtersContainer}>
                <select id='selectOrder' className={s.select} onClick={e => handleOrder(e)}>
                    <option value='select'>Sort</option>
                    <option value='ascendantly by name'>Ascendant by name</option>
                    <option value='descendantly by name'>Descendant by name</option>
                    <option value='ascendantly by population'>Ascendant by population</option>
                    <option value='descendantly by population'>Descendant by population</option>
                    <option value="top 5">Top 5 population</option>
                </select>
                <select id='selectContinent' className={s.select} onChange={e => handleFilterByContinent(e)}>
                    <option value='all'>All</option>
                    <option value='Africa'>Africa</option>
                    <option value='Americas'>Americas</option>
                    <option value='Antarctic'>Antarctic</option>
                    <option value='Asia'>Asia</option>
                    <option value='Europe'>Europe</option>
                    <option value='Oceania'>Oceania</option>
                </select>
                <select id='selectActivity' className={s.select} onChange={e => handleFilterByActivity(e)}>
                    <option value='all'>All</option>
                    {
                        filteredActivities?.map((a) => {
                            return <option key={a.id} value={a.name}>{a.name[0].toUpperCase() + a.name.slice(1)}</option>
                        })
                    }
                </select>
                <button className={s.btnReload} onClick={e => handleReload(e)}>Reload all countries</button>
            </div>
                <div className={s.cardContainer}>
                {
                    currentCountries?.map((c) => {
                        return (
                            <div >
                                <Link className={s.link} to={'/home/' + c.id}>
                                    <Card name={c.name} image={c.image} continent={c.continent} key={c.id} />                                
                                </Link>
                            </div>
                        )
                    })
                }
                </div>
            <Paging countriesPerPage={countriesPerPage} allCountries={allCountries.length} currentPage={currentPage} paging={paging}/>
            </div>
    </div>
)

}