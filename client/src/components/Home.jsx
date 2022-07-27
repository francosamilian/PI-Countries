import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getActivities, getCountries, filterByContinent, filterByActivity, orderByName } from '../actions';
import {Link} from 'react-router-dom';
import Card from './Card';
import Paging from './Paging';

export default function Home() {

const dispatch = useDispatch();
const allCountries = useSelector(state => state.countries);
const allActivities = useSelector(state => state.activities);
const [currentPage, setCurrentPage] = useState(1);
const [countriesPerPage, setCountriesPerPage] = useState(9);
const lastCountry = currentPage * countriesPerPage;
const firstCountry = lastCountry - countriesPerPage;
const currentCountries = allCountries.slice(firstCountry, lastCountry);
const [order, setOrder] = useState('');

const paging = (pageNumber) => {
    if(pageNumber === 1) setCountriesPerPage(9);
    if(pageNumber !== 1) setCountriesPerPage(10);
    setCurrentPage(pageNumber);
}

useEffect(() => {
    dispatch(getCountries())
    dispatch(getActivities())
}, [dispatch]);

let obj = {}
const filteredActivities = allActivities.filter(a => obj[a.name] ? false : obj[a.name] = true);

function handleReload(e) {
    e.preventDefault();
    dispatch(getCountries());
};

function handleFilterByContinent(e) {
    dispatch(filterByContinent(e.target.value));
}

function handleFilterByActivity(e) {
    dispatch(filterByActivity(e.target.value));
}

function handleOrderByName(e) {
    e.preventDefault();
    setCurrentPage(1)
    dispatch(orderByName(e.target.value));
    setOrder(`Ordered ${e.target.value}`);
}

return (
    <div>
        <Link to='/activities'>
            <button>Add activity</button>
        </Link>
            <h1>Countries</h1>
            <button onClick={e => handleReload(e)}>Reload</button>
            <div>
                <select onClick={e => handleOrderByName(e)}>
                    <option value='ascendantly by name'>Ascendant by name</option>
                    <option value='descendantly by name'>Descendant by name</option>
                    <option value='ascendantly by population'>Ascendant by population</option>
                    <option value='descendantly by population'>Descendant by population</option>
                </select>
                <select onChange={e => handleFilterByContinent(e)}>
                    <option value='all'>All</option>
                    <option value='Africa'>Africa</option>
                    <option value='Americas'>Americas</option>
                    <option value='Antarctic'>Antarctic</option>
                    <option value='Asia'>Asia</option>
                    <option value='Europe'>Europe</option>
                    <option value='Oceania'>Oceania</option>
                </select>
                <select onChange={e => handleFilterByActivity(e)}>
                    <option value='all'>All</option>
                    {
                        filteredActivities?.map((a) => {
                            return <option key={a.id} value={a.name}>{a.name[0].toUpperCase() + a.name.slice(1)}</option>
                        })
                    }
                </select>
                <Paging countriesPerPage={countriesPerPage} allCountries={allCountries.length} paging={paging}/>
                <div>
                {
                    currentCountries?.map((c) => {
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
                <Paging countriesPerPage={countriesPerPage} allCountries={allCountries.length} paging={paging}/>
            </div>
    </div>
)

}