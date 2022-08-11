import React from 'react';
import s from './Paging.module.css'

export default function Paging({countriesPerPage, currentPage, allCountries, paging}) {
    const pageNumbers = [];
    for(let i=1; i<=((Math.ceil((allCountries-9)/countriesPerPage))+1); i++) {
        pageNumbers.push(i);
    }
    console.log(currentPage)
    console.log(allCountries)
    console.log(countriesPerPage)
    console.log(paging)

    return (
        <nav>
            <ul className={s.paging}>
                {
                    pageNumbers?.map(n => {
                        return (
                            // <li className={s.numbers} key={n}>
                            //     <a className={n === currentPage ? s.selectedPage : s.a} onClick={() => paging(n)}>{n}</a>
                            // </li>
                            <button className={n === currentPage ? s.selectedPage : s.numbers} key={n} onClick={() => paging(n)}><a className={s.number} >{n}</a></button>
                        )
                    })
                }
            </ul>
        </nav>
    )
}