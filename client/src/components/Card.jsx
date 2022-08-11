import React from 'react';
import s from './Card.module.css'

export default function Card({image, name, continent}) {
    return (
        <div className={s.container}>
            <h2 className={s.name}>{name}</h2>
            <img className={s.image} src={image} alt="img not found"/>
            <h3 className={s.continent}>{continent}</h3>
        </div>
    )
}