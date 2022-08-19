import React from 'react';
import {Link} from 'react-router-dom';
import s from './LandingPage.module.css';

export default function LandingPage() {
    return (
        <div className={s.mainContainer}>
            <div className={s.leftContainer}>
                <h1 className={s.title} >Welcome to the Countries website!</h1>
                <img className={s.image1} src="https://product-image.juniqe-production.juniqe.com/media/catalog/product/seo-cache/x800/771/112/771-112-101L/World-Map-II-The-Cartography-Collection-Poster.jpg" />
                
            </div>
            <div className={s.rigthContainer}>
                <img className={s.image3} src="https://upload.wikimedia.org/wikipedia/commons/9/96/Mundo_hecho_de_Banderas.gif" alt="" />
                <p className={s.paragraph}>Search for your favourite countries all around the world and find the activities available in each of them. </p>
                <Link to='/home'>
                    <button className={s.btn} >Get started!</button>
                </Link>
            </div>
        </div>
    )
}