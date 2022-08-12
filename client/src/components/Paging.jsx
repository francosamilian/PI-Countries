import React from 'react';
import s from './Paging.module.css'

export default function Paging({countriesPerPage, currentPage, allCountries, paging}) {
    const pageNumbers = [];
    for(let i=1; i<=((Math.ceil((allCountries-9)/countriesPerPage))+1); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className={s.paging}>
                {
                    pageNumbers?.map(n => {
                        return (
                            <button className={n === currentPage ? s.selectedPage : s.numbers} key={n} onClick={() => paging(n)}><a className={s.number} >{n}</a></button>
                        )
                    })
                }
            </ul>
        </nav>
    )
}