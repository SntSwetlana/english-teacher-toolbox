import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useParams} from "react-router-dom";
import {Authcontext} from "../context/Authcontext";
import {Loader} from "../components/Loader";
import {QuizletList} from "../components/QuizletList";
import '../css/styles.css'

export const DictionaryPage = () => {
    const [quizlets, setQuizlets] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(Authcontext)
    const linkId = useParams().id

    const fetchQuizlets = useCallback(async () => {
        try{
            const fetched = await request('/api/card', 'GET',null, {
                Authorization: `Bearer ${token}`
            })
            setQuizlets(fetched)
        }
        catch (e) {
            console.log(e)
        }
    }, [token, linkId, request]   )

    useEffect(() => {
        fetchQuizlets()
    }, [fetchQuizlets])

    if(loading){
        return <Loader />
    }
    return(
        <div className='section__Unit'>
        <div className='container'>
            {    console.log('quizlet here!!!')}
            <QuizletList quizlets = {quizlets}/>
        </div>
        </div>
    )
}
