import React from 'react';
import {Link} from 'react-router-dom';

export default function LandingPage() {
    return (
        <div>
            <h1>Welcome to the Countries website!</h1>
            <Link to='/home'>
                <button>Get started</button>
            </Link>
        </div>
    )
}