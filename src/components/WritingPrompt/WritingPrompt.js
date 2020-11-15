import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './WritingPrompt.scss';
import { jsPDF } from 'jspdf';
import { ReactComponent as Upvote} from '../../assets/upload-file.svg';
import { ReactComponent as Time} from '../../assets/clock.svg';

export default function WritingPrompt() {

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

    //time converter function
    const timeConverterFunction = (createdAt) => {
        //get the actual time 
        let timeNow = new Date(createdAt*1000);
        let actualTime = timeNow.toLocaleDateString();

        return actualTime;
    }

    if(fivePrompt) {
        return (
            <div className="writing-prompt">
                {fivePrompt.children.map((data)=> {
                    if(!data.data.selftext){
                        return (
                            <div key={data.data.id} className="prompt" id={data.data.id}>
                                <div className="centering-container">
                                    <div className="column-wrapper">
                                        <p className="prompt__content">The prompts: <span className="prompt__title">"{data.data.title.substring(5)}"</span></p>
                                        <div className="ups-date-wrapper">
                                        <p className="extra-info">Upvotes: <Upvote className="icon"/><strong>{data.data.ups}</strong></p>
                                        <p className="extra-info">Created on: <Time className="icon"/><strong>{timeConverterFunction(data.data.created_utc)}</strong></p>
                                        </div>
                                    </div>
                                </div>

                                <Link to={`/write/${data.data.id}`}>
                                    <button className="button button--write">Write Now</button>
                                </Link>

                            </div>
                        )
                    }
                })}
                <button className="button button--page-nav" onClick={handlePrevPage} disabled={prevButtonState}>Previous Page</button>
                <button className="button button--page-nav" onClick={handleNextPage}>Next Page</button>
            </div>
        )
    } else {
        return (
            <h1>Fetching prompts</h1>
        )
    }
}
