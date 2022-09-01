import React, { useContext, useState } from "react";
import {useHttp} from "../hooks/http.hook";
import {Authcontext} from "../context/Authcontext";
import {Loader} from "../components/Loader";
import StudyPage from "../components/StudyPage";
import '../css/schoolpage.css'

export const SchoolPage = () => {

    const [flashcards, setFlashcards] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(Authcontext)

    const checkSeaHandler = (async () => {
        try{
            const fetched = await request('/api/card', 'GET',null, {
                Authorization: `Bearer ${token}`
            })
            setFlashcards(fetched)
        }
        catch (e) {
            console.log(e)
        }
    })


    if(loading){
        return <Loader />
    }

    return(
        <div className='section__Unit'>
            <section>
                <button  onClick={checkSeaHandler}
                >Let's see cards</button>
                <StudyPage flashcards = {flashcards} />
            </section>
        </div>
    );
}
