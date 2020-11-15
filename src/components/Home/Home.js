import React from 'react';
import './Home.scss';
import { ReactComponent as Next } from '../../assets/next.svg';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="home">
            <div className="hero">
                <h1 className="hero__title">G.G. Writing Prompt</h1>
                <div className="hero__wrapper"> 
                    <h2 className="hero__content">“We write to taste life twice, in the moment and in retrospect.”</h2>
                    <h2 className="hero__content">― Anais Nin</h2>
                    <p className="hero__subtitle">Welcome to a distraction free writing zone, powered by reddit!</p>
                </div>
            </div>
            <Link to="/write">
                <button className="button button--hero">
                    <div className="icon-wrapper">
                        Get Writing <Next className="icon icon--next"/>
                    </div>
                </button>
            </Link>
        </div>
    )
}
 