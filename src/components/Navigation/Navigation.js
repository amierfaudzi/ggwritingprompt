import React from 'react'
import { Link } from 'react-router-dom';
import './Navigation.scss';

export default function Navigation() {
    return (
        <div className="navigation">
            <Link className="link" to="/"><div className="navigation__list">GGWP</div></Link>
            <div className="row-wrapper">
                <Link className="link" to="/write"><div className="navigation__list">WRITE</div></Link>
                <Link className="link" to="/about"><div className="navigation__list">ABOUT</div></Link>
            </div>
        </div>
    )
}
