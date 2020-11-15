import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './WritingPrompt.scss';
import { jsPDF } from 'jspdf';

export default function Prompt() {

    let [fivePrompt, setFivePrompt] = useState(null);
    let [nextPageID, setNextPageID] = useState(null);
    let [prevPageID, setPrevPageID] = useState(null);
    let [prevPrevPageID, setPrevPrevPageID] = useState([]);
    let [prevButtonState, setPrevButtonState] =useState(true);
    const doc = new jsPDF();

    //getting the prompt at the beginning
    const getPrompt = () => {
        axios.get('https://www.reddit.com/r/writingprompts/hot.json?sort=hot&limit=5')
        .then(result=>{
            //storing the data from the API
            setFivePrompt(fivePrompt=result.data.data);
            console.log("new values of five prompts is >>>", fivePrompt);

            //saving the page ID to be able to navigate
            setNextPageID(nextPageID = fivePrompt.after)
            console.log(nextPageID);
        })
        .catch(err=>console.log(err))
    }
    //navigating to the next page
    const nextPage = () => {
        //next page ID must be provided
        const NEXT_PAGE_URL="&after=";
        setPrevPrevPageID([...prevPrevPageID, prevPageID]);
        setPrevPageID(prevPageID = nextPageID);
        axios.get('https://www.reddit.com/r/writingprompts/hot.json?sort=hot&limit=5'+NEXT_PAGE_URL+nextPageID)
        .then(result=>{
            //storing the data from the API
            setFivePrompt(fivePrompt=result.data.data);

            //saving the page ID to be able to navigate
            setNextPageID(nextPageID = fivePrompt.after)
            console.log(nextPageID);
        })
        .catch(err=> console.log(err))

        console.log("these are the ID brother", prevPrevPageID, prevPageID, nextPageID)
    }
    //navigation to the previous page
    const prevPage = () => {
        //next page take id from prev and prev take from prev prev
        const PREV_PAGE_URL="&before=";
        setPrevPageID(prevPageID = prevPrevPageID.pop());
        axios.get('https://www.reddit.com/r/writingprompts/hot.json?sort=hot&limit=5'+PREV_PAGE_URL+prevPageID)
        .then(result=>{
            //storing the data from the API
            setFivePrompt(fivePrompt=result.data.data);

            //saving the page ID to be able to navigate
            setNextPageID(nextPageID = fivePrompt.after)
            console.log(nextPageID);
        })
        .catch(err=> console.log(err))

        console.log("these are the ID brother", prevPrevPageID, prevPageID, nextPageID)
    }
    
    //similar to componentDidMount for classes to retrieve then data on load
    useEffect(() => {
        getPrompt();
    }, [])

    useEffect(() => {
        if(prevPageID) {
            setPrevButtonState(prevButtonState=false)
        } else {
            setPrevButtonState(prevButtonState=true)
        }
    })

    const handleNextPage = (event) => {
        event.preventDefault();
        nextPage();
    }

    
    const handlePrevPage = (event) => {
        event.preventDefault();
        prevPage();
    }

    const handleSave = (event) => {
        event.preventDefault();
        doc.text("Hello world!", 10, 10);
        doc.save("prompt.pdf");
    }

    if(fivePrompt) {
        return (
            <div className="writing-prompt">
                {fivePrompt.children.map((data)=> {
                    if(!data.data.selftext){
                        return (
                            <div key={data.data.id} className="prompt" id={data.data.id}>
                                <p>The prompts is: {data.data.title.substring(5)}</p>
                                <Link to={`/${data.data.id}`}>
                                    <button>Write Now</button>
                                </Link>
                            </div>
                        )
                    }
                })}
                <button onClick={handlePrevPage} disabled={prevButtonState}>Previous Page</button>
                <button onClick={handleNextPage}>Next Page</button>
                <button onClick={handleSave}>Save as PDF</button>
            </div>
        )
    } else {
        return (
            <h1>Fetching prompts</h1>
        )
    }
}
