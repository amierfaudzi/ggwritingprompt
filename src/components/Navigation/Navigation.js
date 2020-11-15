import React from 'react'
import { Link } from 'react-router-dom';
import './Navigation.scss';

export default function Navigation() {
    return (
        <div className="navigation">
            <Link to="/">GGWP</Link>
            <Link to="/write">Write</Link>
            <Link to="/about">About</Link>
        </div>
    )
}
