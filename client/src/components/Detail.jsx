import React, {Component} from "react";
import {Link} from 'react-router-dom';
import { countryDetail } from "../actions";
import { connect } from "react-redux";
import s from './Detail.module.css';

// -- CLASS COMPONENT --

export class Detail extends Component {
    constructor(props) {
        super(props);
        this.id = props.match.params.id;
    }

    componentDidMount() {
        this.props.countryDetail(this.id)
    }

    render() {
        let country = this.props.country;
        return (
            <div>
            {
            Object.entries(country).length>0?       
            <div className={s.mainContainer}>
                <div className={s.countryContainer}>
                    <h1 className={s.countryName}>{country.name}</h1>
                    <img className={s.img} src={country.image}/>
                    <h2 className={s.info} >Capital: {country.capital ? country.capital.substring(1, country.capital.length -1) : 'This country has no capital'}</h2>
                    <h2 className={s.info} >Continent: {country.continent}</h2>
                    <h2 className={s.info} >Subregion: {country.subRegion ? country.subRegion : 'This country has no subregion'}</h2>
                    <h2 className={s.info} >Population: {country.population}</h2>
                    <h2 className={s.info} >Area: {country.area}</h2>
                    <h2 className={s.info} >ID: {country.id}</h2>
                </div>
                <div className={s.activityContainer}>
                    <h4 className={s.activities} >Activities: </h4>
                    {country.activities.length>0?  country.activities?.map(a =>
                    <div>
                        <h2 className={s.actInfo} >Name: {a.name}</h2>
                        <h2 className={s.actInfo} >Seasons: {a.seasons}</h2> 
                        <h2 className={s.actInfo} >Difficulty: {a.difficulty}</h2>
                        <h2 className={s.duration} >Duration: {a.duration}</h2>
                    </div> ): <div> <p className={s.noAct} >This country has no activities</p></div>}
                    <Link className={s.link} to='/home'><button className={s.btn} >Back</button></Link>
                </div> 
            </div>
            : <p>Loading...</p>
        }
    </div>
        )
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        countryDetail: (id) => dispatch(countryDetail(id)),
    }
}

export const mapStateToProps = (state) => {
    return {
        country: state.countryDetail
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);