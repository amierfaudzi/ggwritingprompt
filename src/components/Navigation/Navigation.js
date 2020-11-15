import React from 'react'
import { Link } from 'react-router-dom';
import './Navigation.scss';

export default function Navigation() {
    return (
        <div className="navigation">
            <Link to="/">GGWP</Link>
            <Link>Write</Link>
            <Link>About</Link>
        </div>
    )
}
