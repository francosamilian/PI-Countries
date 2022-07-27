import React from 'react';

export default function Paging({countriesPerPage, setCountriesPerPage, allCountries, paging}) {
    const pageNumbers = [];

    for(let i=1; i<=Math.ceil(allCountries/countriesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul>
                {
                    pageNumbers?.map(n => {
                        return (
                            <li key={n}>
                                <a onClick={() => paging(n)}>{n}</a>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}