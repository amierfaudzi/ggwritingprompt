import React from 'react';
import './About.scss';
import profilePic from '../../assets/profilepic.jpg';
import { ReactComponent as GitHub} from '../../assets/gitHub.svg';
import { ReactComponent as LinkedIn} from '../../assets/linkedIn.svg';

export default function About() {
    return (
        <div className="about">
            <h1 className="about__header">About</h1>
            <div className="about-wrapper">
            <div className="about__card about__card--ggwp">
            <div className="header-wrapper">
            <h2 className="about__title">GG Writing Prompt</h2>
            </div>
            <p className="about__content">I have always loved writing! The world you can conjure and the possibilities are simply endless. Which is what <span className="span span--max" title="Did you see what I did there ;D">prompted</span> me to work on this project in the first place. I created this website using React JS particularly using hooks and I'm proud to say that this website is 100% functional component certified. </p>
            <div className="header-wrapper header-wrapper--footer">
                <h2 className="about__footer">Happy writing!</h2>
            </div>
            </div>
            <div className="about__card">
            <h2 className="about__title">Future Plans</h2>
            <p className="about__content">The initial timeline for this project is a weekend, so there was a lot of features that were left out for the sake of completion. Below is the list of the stretch goals for this website in the future</p>
            <ul>
                <li className="list">User authentication - log in/log out functionality.</li>
                <li className="list">Database to enable users to save stories on their profile.</li>
                <li className="list">Saving selected prompt as PDF, so one might be able to print and write on it.</li>
                <li className="list">Another page to display the recent entries written by users.</li>
            </ul>
            </div>
            <div className="about__card about__card--me">
                <div className="header-wrapper">
                    <h2 className="about__title">About me</h2>
                </div>
            <img src={profilePic} alt="profile picture" className="image"/>
            <p className="about__content">I'm Amier and I'm a Full-Stack Web Developer. I love to build stuff, mechanically and digitally. Follow me on GitHub and/or connect with me on linkedIn!</p>
            <div className="connect-wrapper">
                <a href="https://github.com/amierfaudzi" target="_blank">
                    <GitHub className="icon icon--social"/>
                </a>
                <a href="https://www.linkedin.com/in/amierfaudzi/" target="_blank">
                    <LinkedIn className="icon icon--social"/>
                </a>
            </div>
            </div>
            </div>
        </div>
    )
}
