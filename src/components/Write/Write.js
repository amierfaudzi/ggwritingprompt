import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import './Write.scss';

export default function Write(props) {

    let [shownPrompt, setShownPrompt] = useState("");
    let [selectedPromptEn, setSelectedPromptEn] = useState("");
    let [selectedPromptMy, setSelectedPromptMy] = useState("");
    let [selectedPromptFr, setSelectedPromptFr] = useState("");
    let [languageEn, setLanguageEn] = useState(true);
    let [languageMy, setLanguageMy] = useState(false);
    let [languageFr, setLanguageFr] = useState(false);

    //axios get request of that particular post
    const getSelectedPrompt = () => {
        axios.get(`https://www.reddit.com/by_id/t3_${props.match.params.promptId}.json`)
        .then(res=> {
            setSelectedPromptEn(selectedPromptEn = res.data.data.children[0].data.title.substring(5));
            //set the shown prompt
            setShownPrompt(shownPrompt = selectedPromptEn);
        })
        .catch(err=> console.log(err))
    }
    //setting the state during mount
    useEffect(() => {
        getSelectedPrompt();
        alert("To save your story, fill in your name and email and click the 'SAVE THIS!' button below :D");
    }, [])
    //if english is selected
    const handleEnglish = (event) => {
        event.preventDefault();
        setLanguageEn(languageEn=true);
        setLanguageMy(languageMy=false);
        setLanguageFr(languageFr=false);
        //change the prompt back to english
        setShownPrompt(shownPrompt = selectedPromptEn);
    }
    //if malay is selected
    const handleMalay = (event) => {
        event.preventDefault();
        setLanguageEn(languageEn=false);
        setLanguageMy(languageMy=true);
        setLanguageFr(languageFr=false);
        //check if malay has been selected before then select either get request for malay or change the shown prompt to malay
        if(!selectedPromptMy) {
            //axios request to translate from English to Malay
            axios({
                method: 'post',
                url: 'https://lingvanex-translate.p.rapidapi.com/translate',
                headers: {
                    "x-rapidapi-key": "7ecda9ef8amsh14c03e5efc0001ep15242fjsne692931f5a36",
                    "x-rapidapi-host": "lingvanex-translate.p.rapidapi.com",
                    "content-type": "application/json" 
                },
                data: {
                    from: 'en_GB',
                    to: 'ms_MY',
                    data: `${selectedPromptEn}`,
                    platform: 'api'
                }
            })
            .then(res=> {
                console.log(res.data.result)
                setSelectedPromptMy(selectedPromptMy=res.data.result);
                setShownPrompt(shownPrompt = selectedPromptMy);
            })
            .catch(err=> console.log(err))
        } else {
            //set the shown prompt to the the stored language
            setShownPrompt(shownPrompt = selectedPromptMy);
        }
    }
    //if french is selected
    const handleFrench = (event) => {
        event.preventDefault();
        setLanguageEn(languageEn=false);
        setLanguageMy(languageMy=false);
        setLanguageFr(languageFr=true);
                //check if french has been selected before then select either get request for french or change the shown prompt to french
        if(!selectedPromptFr) {
            //axios request to translate from English to French
            axios({
                method: 'post',
                url: 'https://lingvanex-translate.p.rapidapi.com/translate',
                headers: {
                    "x-rapidapi-key": "7ecda9ef8amsh14c03e5efc0001ep15242fjsne692931f5a36",
                    "x-rapidapi-host": "lingvanex-translate.p.rapidapi.com",
                    "content-type": "application/json" 
                },
                data: {
                    from: 'en_GB',
                    to: 'fr_Fr',
                    data: `${selectedPromptEn}`,
                    platform: 'api'
                }
            })
            .then(res=> {
                console.log(res.data.result)
                setSelectedPromptFr(selectedPromptFr=res.data.result);
                setShownPrompt(shownPrompt = selectedPromptFr);
            })
            .catch(err=> console.log(err))
        } else {
            //set the shown prompt to the the stored language
            setShownPrompt(shownPrompt = selectedPromptFr);
        }
    }
    //sending the data to the user
    const handleSubmit = (event) => {
        event.preventDefault();
        //will send the title, the written prompt, and name, pen or otherwise to the given email
        //the names in the form are promptTitle, promptContent, name, email 
        const title = event.target.promptTitle.value;
        const story = event.target.promptContent.value;
        const name = event.target.name.value;
        const email = event.target.email.value;
        window.open(`mailto:${email}?cc=ggwritingprompt@gmail.com&subject=${title}&body=By ${name}: ${story}`);
    }
    return (
        <div className="write">
            <h1 className="write__title">Write</h1>
            <div className="prompt-container">
                <p>Your prompt is: <span className="span span--bold">"{shownPrompt}"</span></p>
            </div>
            <div className="main-container">
            <form className="write-form" onSubmit={handleSubmit}>
                <input type="text" name="promptTitle" id="" className="write-form__title" placeholder="Title here"/>
                <textarea name="promptContent" id="" className="write-form__content" placeholder="Write here"></textarea>
                <div className="send-wrapper">
                    <input className="send-wrapper__name" type="text" name="name" id="" placeholder="Name, pen or otherwise"/>
                    <input className="send-wrapper__email" type="email" name="email" id="" placeholder="johndoe123@example.com" required/>
                    <button type="submit" className="button">Save this!</button>
                </div>
            </form>
            <div className="button-container">
                <button className="button button--lang" onClick={handleEnglish} disabled={languageEn}>English</button>
                <button className="button button--lang"onClick={handleMalay} disabled={languageMy}>Malay</button>
                <button className="button button--lang"onClick={handleFrench} disabled={languageFr}>French</button>
            </div>
            </div>
        </div>
    )
}
