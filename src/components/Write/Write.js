import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';

export default function Write(props) {

    let [selectedPrompt, setSelectedPrompt] = useState("");
    let [languageEn, setLanguageEn] = useState(true);
    let [languageMy, setLanguageMy] = useState(false);
    let [languageFr, setLanguageFr] = useState(false);

    //axios get request of that particular post
    const getSelectedPrompt = () => {
        axios.get(`https://www.reddit.com/by_id/t3_${props.match.params.promptId}.json`)
        .then(res=> {
            setSelectedPrompt(selectedPrompt = res.data.data.children[0].data.title);
            console.log(selectedPrompt)
        })
        .catch(err=> console.log(err))
    }
    //setting the state during mount
    useEffect(() => {
        getSelectedPrompt();
    }, [])
    //if english is selected
    const handleEnglish = (event) => {
        event.preventDefault();
        setLanguageEn(languageEn=true);
        setLanguageMy(languageMy=false);
        setLanguageFr(languageFr=false);
    }
    //if malay is selected
    const handleMalay = (event) => {
        event.preventDefault();
        setLanguageEn(languageEn=false);
        setLanguageMy(languageMy=true);
        setLanguageFr(languageFr=false);
    }
    //if french is selected
    const handleFrench = (event) => {
        event.preventDefault();
        setLanguageEn(languageEn=false);
        setLanguageMy(languageMy=false);
        setLanguageFr(languageFr=true);
    }
    return (
        <div>
            <h1>Pls write here</h1>
                <h2>Your prompt is {selectedPrompt.substring(5)}</h2>
            <form>
                <textarea name="" id="" cols="30" rows="10" placeholder="write here"></textarea>
            </form>
            <button onClick={handleEnglish} disabled={languageEn}>English</button>
            <button onClick={handleMalay} disabled={languageMy}>Malay</button>
            <button onClick={handleFrench} disabled={languageFr}>French</button>
        </div>
    )
}
