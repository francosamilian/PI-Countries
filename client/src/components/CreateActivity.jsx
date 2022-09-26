import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {createActivity, getActivities} from '../actions/index';
import { useDispatch, useSelector } from 'react-redux'; 
import s from './CreateActivity.module.css'

function validate(form) {
    let errors = {};
    if(!form.name) errors.name = 'The activity must have a name';
    else if(!form.difficulty || form.difficulty < 1 || form.difficulty > 5) errors.difficulty = 'The difficulty must be between 1 and 5';
    else if(form.duration === '') errors.duration = 'The activity must have a duration';
    else if(form.seasons.length === 0) errors.seasons = 'You must select at least one season'
    else if(form.country.length === 0) errors.country = 'The activity must be assigned to a country';
    return errors;
};

export default function CreateActivity() {

const allCountries = useSelector(state => state.countries);
const allCountryNames = allCountries.map(c => c.name).sort();
const dispatch = useDispatch();
const history = useHistory();
const [form, setForm] = useState({name: '', difficulty: '', duration: '', seasons: [], country: []});
const [errors, setErrors] = useState({});

useEffect(() => {dispatch(getActivities())}, []);

function handleInputChange(e) {
    setForm({...form, [e.target.name]: e.target.value});
    setErrors(validate({...form, [e.target.name]: e.target.value}));
}

function handleSelectCountryChange(e) {
    if(!form.country.includes(e.target.value)) {
        setForm({...form, country: [...form.country, e.target.value]});
        setErrors(validate({...form, country: e.target.value}));
    }
}

function handleCheckChange(e) {
    let seasons = form.seasons;
    let seasonFound = seasons.indexOf(e.target.value);
    if(seasonFound >= 0) seasons.splice(seasonFound, 1);     // si la season ya está en el array, la saco
    else seasons.push(e.target.value);                       // si la season no está en el array, la agrego
    setForm({...form, seasons: seasons});
    setErrors(validate(form));
}

function handleDelete(e) {
    setForm({...form, country: form.country.filter(c => c !== e)})
}

function handleSubmit(e) {
    e.preventDefault();
    if(!form.name || form.country.length === 0) return alert('There is missing information');
    dispatch(createActivity(form));
    alert('Activity created successfully');
    setForm({name: '', difficulty: '', duration: '', seasons: [], country: []});
    history.push('/home');
}

return (
    <div className={s.mainContainer} >
        <div className={s.leftContainer}>
            <Link className={s.link} to='/home'><button className={s.btnBack} >Back</button></Link>
            <img className={s.img} src="data:image/jpeg;base64,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" alt="" />
        </div>
        <div className={s.rightContainer}>
            <h1 className={s.title} >Share your experiences!</h1>
            <div className={s.formContainer}>
                <form className={s.form} onSubmit={e => handleSubmit(e)}>
                    <div className={s.nameContainer}>
                        <label className={s.label}>Name: </label>
                        <input className={s.inputName} onChange={e => handleInputChange(e)} type="text" value={form.name} name='name' />
                        {errors.name && (<p className={s.errorName} >{errors.name}</p>)}
                    </div>
                    <div className={s.difContainer}>
                        <label className={s.label} >Difficulty: </label>
                        <input className={s.inputDifficulty} onChange={e => handleInputChange(e)} type="number" value={form.difficulty} name='difficulty' />
                        {errors.difficulty && (<p className={s.errorDif} >{errors.difficulty}</p>)}
                    </div>
                    <div className={s.durContainer}>
                        <label className={s.label} >Duration: </label>
                        <input className={s.inputDuration} onChange={e => handleInputChange(e)} type="text" value={form.duration} name='duration' />
                        {errors.duration && (<p className={s.errorDur} >{errors.duration}</p>)}
                    </div>
                    <div className={s.seasonContainer}>
                        <label className={s.label} >Season: </label>
                        <label className={s.labelCheck} ><input className={s.check} id='checkbox' type='checkbox' name='Winter' value='Winter' onChange={e => handleCheckChange(e)}/>Winter</label>
                        <label className={s.labelCheck} ><input className={s.check} id='checkbox' type='checkbox' name='Summer' value='Summer' onChange={e => handleCheckChange(e)}/>Summer</label>
                        <label className={s.labelCheck} ><input className={s.check} id='checkbox' type='checkbox' name='Autumn' value='Autumn' onChange={e => handleCheckChange(e)}/>Autumn</label>
                        <label className={s.labelCheck} ><input className={s.check} id='checkbox' type='checkbox' name='Spring' value='Spring' onChange={e => handleCheckChange(e)}/>Spring</label>
                        {errors.seasons && (<p className={s.errorSeason} >{errors.seasons}</p>)}
                    </div>
                    <div className={s.countryContainer}>
                        <label className={s.label} name='country'>Country: </label>
                        <select className={s.select} onChange={e => handleSelectCountryChange(e)}>
                        {
                            allCountryNames?.map(c => {
                                return <option key={c} value={c}>{c}</option>
                            })
                        }
                        </select>
                        {errors.country && (<p className={s.errorCountry} >{errors.country}</p>)}
                    </div>
                    <div className={s.addedContainer} >
                        {form.country?.map(c => 
                        <div  > 
                            <p className={s.addedCountries} >{c}<button type='button' className={s.btnRemove} onClick={() => handleDelete(c)}>x</button></p>
                        </div>)}
                    </div>
                    {Object.entries(errors).length>0 ? 
                    (<button className={s.btnCreate} type='submit' disabled>Create activity</button>) 
                    : (<button className={s.btnCreate} type='submit'>Create activity</button>)}
                    
                </form>
            </div>
        </div>
    </div>
)

}