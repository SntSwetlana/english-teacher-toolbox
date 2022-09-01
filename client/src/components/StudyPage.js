import React, {useState} from "react";
import styled from "styled-components";
import l_flashCards from './icons/flashcards.svg';
import l_Learn from "./icons/learn.svg"
import l_test from "./icons/test.svg"
import l_match from "./icons/match.svg"
import l_shuffle from "./icons/shuffle.svg"
import l_left from "./icons/chevron_left.svg"
import l_right from "./icons/chevron_right.svg"
import l_play from "./icons/play_arrow_.svg"
import l_speech from "./icons/speech.svg"
import {NavLink} from "react-router-dom";

export default function StudyPage({flashcards}) {

    const [index, setIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [clicked, setClicked] = useState(false);
    const start = 0; // От какого генерировать

    //make random arrow for indexing questions
    const array_IndexQuestions = []
    for (let i=start;i<flashcards.length;i++){
        array_IndexQuestions.push(i)
    }
    console.log(`flashcards.length =${flashcards.length}`)
    if(flashcards.length===0) return;

    const nextFlashcard = () => {
        setIndex((oldIndex) => {
            const index = oldIndex + 1
            if (index > flashcards.length - 1 ){
                setIndex(0);
                return 0
            }else{
                return index
            }
        })
    }

    const prevFlashcard = () => {
        setIndex((oldIndex) => {
            const index = oldIndex - 1
            if (index < 0 ){
                setIndex(0);
                return 0
            }else{
                return index
            }
        })
    }

     'speechSynthesis' in window ? console.log("Web Speech API supported!") : console.log("Web Speech API not supported :-(")
     const synth = window.speechSynthesis

    return (
        <>
        <div>
            <Ul>
                <Li_grid ><Item1><img src={l_flashCards} alt=""/></Item1><NavLink  to='/' className='Item2'>Flashcards</NavLink></Li_grid>
                <Li_grid ><Item1><img src={l_Learn} alt=""/></Item1><Item2>Learn</Item2></Li_grid>
                <Li_grid ><Item1><img src={l_test} alt=""/></Item1><Item2> Test</Item2></Li_grid>
                <Li_grid ><Item1><img src={l_match} alt=""/></Item1><Item2>Match</Item2></Li_grid>
            </Ul>

            <Container>
                <Background />
                <Progress percent={(index+1)*(100.0/(flashcards.length ))} />
            </Container>

            <FlashCard>
                <FlashCardInner className={flipped ? "flipped" : ""}>
                    <CardFront
                        onClick={() => {
                            setFlipped(true);
                        }}
                    >
                        <Speech onClick={() => {
                            const utterThis = new SpeechSynthesisUtterance(flashcards[array_IndexQuestions[index]].term)
                            synth.speak(utterThis)}}
                        > Termin <img src={l_speech} alt=""/></Speech>
                        <Span> {index+1}/{flashcards.length}</Span>
                        <Edit></Edit>
                        <Term>{flashcards[array_IndexQuestions[index]].term}</Term>
                    </CardFront>
                    <CardBack
                        onClick={() => {
                            setFlipped(false);
                        }}
                    >
                        <Speech
                            onClick={() => {
                                const utterThis1 = new SpeechSynthesisUtterance(flashcards[array_IndexQuestions[index]].definition)
                                synth.speak(utterThis1)}}
                        > Definition <img src={l_speech} alt=""/></Speech>
                        <Span> {index+1}/{flashcards.length}</Span>
                        <Edit></Edit>
                        <Term>{flashcards[array_IndexQuestions[index]].definition}</Term>
                    </CardBack>
                </FlashCardInner>
            </FlashCard>

            <ShufflePlay>
                <Shevrons><img src={l_play} alt=""/> <img src={l_shuffle} alt=""/>
                    <Button1 onClick={prevFlashcard}> <img src={l_left} alt=""/> </Button1>
                    <Button1 onClick={nextFlashcard}> <img src={l_right} alt=""/> </Button1>
                </Shevrons>
            </ShufflePlay>
            <Table>
                <thead>
                <tr>
                    <th>Term</th>
                    <th>Definition</th>
                </tr>
                </thead>

                <tbody>
                {flashcards.map((flashcard, index) => {
                    return(
                        <tr key={index}>
                            <td>{flashcard.term}</td>
                            <td>{flashcard.definition}</td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>

        </div>
        </>
    )
}

const Container = styled.div`
  height: 7px;
  width: 100%;
  position: relative;
`;

const BaseBox = styled.div`
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 3px;
  transition: width .5s ease-in-out;
`;

const Background = styled(BaseBox)`
  background: grey;
  width: 100%;
`;

const Progress = styled(BaseBox)`

  background: linear-gradient(135deg,#eb934f 20%,#63a9da 70%);;
  width: ${({ percent }) => percent}%;
`;

const Ul = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
  display: flex;
  justify-content: center;
//  width: 100%;
  position: center;
  left: 0;
  top: 0;
  list-style-type: none;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  margin: 10px 0 10px 0;
  gap: 20px;
`;

const Li = styled(Ul)`
  display: flex;
  position: relative;
  list-style-type: none;
  background: white;
//  width: 300px;
  border: 3px solid white;
  text-decoration: none;
  text-align: left;
  font-size: 26px;
  color: #fff;
  padding: 10px 10px;
`;


const Li_grid = styled(Ul)`
  display: grid;
  background-color: white;
// border: 3px solid white;
  text-decoration: none;
  text-align: left;
  font-size: 26px;
  padding: 10px 95px 10px 10px;
  border-radius: 6px;
  grid-template-columns: auto auto auto;
//  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  cursor: pointer;
  box-shadow:10px -7px 10px -8px rgba(39,170,237,.3),15px 13px 10px -13px rgba(39,170,225,.3),-14px 3px 10px -16px #f7941d,-14px -11px 10px -15px #f7941d,-14px 13px 10px -15px #f7941d;
  -moz-box-shadow:10px -7px 10px -8px rgba(39,170,237,.3),15px 13px 10px -13px rgba(39,170,225,.3),-14px 3px 10px -16px #f7941d,-14px -11px 10px -15px #f7941d,-14px 13px 10px -15px #f7941d;
  -o-box-shadow:10px -7px 10px -8px rgba(39,170,237,.3),15px 13px 10px -13px rgba(39,170,225,.3),-14px 3px 10px -16px #f7941d,-14px -11px 10px -15px #f7941d,-14px 13px 10px -15px #f7941d;
  -ms-box-shadow:10px -7px 10px -8px rgba(39,170,237,.3),15px 13px 10px -13px rgba(39,170,225,.3),-14px 3px 10px -16px #f7941d,-14px -11px 10px -15px #f7941d,-14px 13px 10px -15px #f7941d;
  -webkit-box-shadow:10px -7px 10px -8px rgba(39,170,237,.3),15px 13px 10px -13px rgba(39,170,225,.3),-14px 3px 10px -16px #f7941d,-14px -11px 10px -15px #f7941d,-14px 13px 10px -15px #f7941d;


  transition:box-shadow .8s ease;
  -moz-transition:box-shadow .8s ease;
  -o-transition:box-shadow .8s ease;
  -ms-transition:box-shadow .8s ease;
  -webkit-transition:box-shadow .8s ease;


  &:hover{
    transition:box-shadow .8s ease;
    -moz-transition:box-shadow .8s ease;
    -o-transition:box-shadow .8s ease;
    -ms-transition:box-shadow .8s ease;
    -webkit-transition:box-shadow .8s ease;
    color:#000;
    box-shadow:20px -16px 15px -15px rgba(39,170,237,.5),20px 0 15px -13px rgba(39,170,225,.5),20px 16px 15px -13px rgba(39,170,225,.5),-21px 18px 15px -18px #f7941d,-8px -3px 15px -5px #f7941d;
    -moz-box-shadow:20px -16px 15px -15px rgba(39,170,237,.5),20px 0 15px -13px rgba(39,170,225,.5),20px 16px 15px -13px rgba(39,170,225,.5),-21px 18px 15px -18px #f7941d,-8px -3px 15px -5px #f7941d;
    -o-box-shadow:20px -16px 15px -15px rgba(39,170,237,.5),20px 0 15px -13px rgba(39,170,225,.5),20px 16px 15px -13px rgba(39,170,225,.5),-21px 18px 15px -18px #f7941d,-8px -3px 15px -5px #f7941d;
    -ms-box-shadow:20px -16px 15px -15px rgba(39,170,237,.5),20px 0 15px -13px rgba(39,170,225,.5),20px 16px 15px -13px rgba(39,170,225,.5),-21px 18px 15px -18px #f7941d,-8px -3px 15px -5px #f7941d;
    -webkit-box-shadow:20px -16px 15px -15px rgba(39,170,237,.5),20px 0 15px -13px rgba(39,170,225,.5),20px 16px 15px -13px rgba(39,170,225,.5),-21px 18px 15px -18px #f7941d,-8px -3px 15px -5px #f7941d
  }

  //&:before{
  //  background: linear-gradient(90deg, #F7941D 0%, #27AAE1 100%);
  //  opacity: 0.8;
  //  filter: blur(40px);
  //  border-radius: 6px;//  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  //}
`;
const Item1 = styled.div`
  display: flex;
`;

const Item2 = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  margin: auto;
  grid-column-start: 2;
  grid-column-end: 3;
`;

const FlashCard = styled.div`
  position: relative;
  height: 25vw;
  margin-top: 20px;
  text-decoration: none;
  text-align: left;
  font-size: 26px;
  cursor: pointer;
  transition: z-index 500ms, transform 0.6s;
  perspective: 1000px;
  z-index: 0;

  background: linear-gradient(90deg, #F7941D 0%, #27AAE1 100%);
  opacity: 0.8;
//  filter: blur(40px);
  border-radius: 6px;

  transform-style: preserve-3d;
  box-shadow:10px -7px 10px -8px rgba(39,170,237,.3),15px 13px 10px -13px rgba(39,170,225,.3),-14px 3px 10px -16px #f7941d,-14px -11px 10px -15px #f7941d,-14px 13px 10px -15px #f7941d;
  -moz-box-shadow:10px -7px 10px -8px rgba(39,170,237,.3),15px 13px 10px -13px rgba(39,170,225,.3),-14px 3px 10px -16px #f7941d,-14px -11px 10px -15px #f7941d,-14px 13px 10px -15px #f7941d;
  -o-box-shadow:10px -7px 10px -8px rgba(39,170,237,.3),15px 13px 10px -13px rgba(39,170,225,.3),-14px 3px 10px -16px #f7941d,-14px -11px 10px -15px #f7941d,-14px 13px 10px -15px #f7941d;
  -ms-box-shadow:10px -7px 10px -8px rgba(39,170,237,.3),15px 13px 10px -13px rgba(39,170,225,.3),-14px 3px 10px -16px #f7941d,-14px -11px 10px -15px #f7941d,-14px 13px 10px -15px #f7941d;
  -webkit-box-shadow:10px -7px 10px -8px rgba(39,170,237,.3),15px 13px 10px -13px rgba(39,170,225,.3),-14px 3px 10px -16px #f7941d,-14px -11px 10px -15px #f7941d,-14px 13px 10px -15px #f7941d;


  transition:box-shadow .8s ease;
  -moz-transition:box-shadow .8s ease;
  -o-transition:box-shadow .8s ease;
  -ms-transition:box-shadow .8s ease;
  -webkit-transition:box-shadow .8s ease;
  backdrop-filter: blur(40px);
  &:hover{
    transition:box-shadow .8s ease;
    -moz-transition:box-shadow .8s ease;
    -o-transition:box-shadow .8s ease;
    -ms-transition:box-shadow .8s ease;
    -webkit-transition:box-shadow .8s ease;
    color:#000;
    box-shadow:20px -16px 15px -15px rgba(39,170,237,.5),20px 0 15px -13px rgba(39,170,225,.5),20px 16px 15px -13px rgba(39,170,225,.5),-21px 18px 15px -18px #f7941d,-8px -3px 15px -5px #f7941d;
    -moz-box-shadow:20px -16px 15px -15px rgba(39,170,237,.5),20px 0 15px -13px rgba(39,170,225,.5),20px 16px 15px -13px rgba(39,170,225,.5),-21px 18px 15px -18px #f7941d,-8px -3px 15px -5px #f7941d;
    -o-box-shadow:20px -16px 15px -15px rgba(39,170,237,.5),20px 0 15px -13px rgba(39,170,225,.5),20px 16px 15px -13px rgba(39,170,225,.5),-21px 18px 15px -18px #f7941d,-8px -3px 15px -5px #f7941d;
    -ms-box-shadow:20px -16px 15px -15px rgba(39,170,237,.5),20px 0 15px -13px rgba(39,170,225,.5),20px 16px 15px -13px rgba(39,170,225,.5),-21px 18px 15px -18px #f7941d,-8px -3px 15px -5px #f7941d;
    -webkit-box-shadow:20px -16px 15px -15px rgba(39,170,237,.5),20px 0 15px -13px rgba(39,170,225,.5),20px 16px 15px -13px rgba(39,170,225,.5),-21px 18px 15px -18px #f7941d,-8px -3px 15px -5px #f7941d
  }

  &.flipped{
    z-index: 1;
  }
  &.clicked{
    z-index: 1;
  }
`;
const FlashCardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: block;
  background-color: white;
  border-radius: 6px;

  margin: 0px;
  transition: transform .5s;
  transform-style: preserve-3d;
//  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  &.flipped{
    transform: rotateX(180deg);
  }
  &.clicked{
    @media()
  }
`;
const CardFront = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: calc(100% - 60px);
  height: calc(100% - 60px);
  display: grid;
  padding: 30px 30px;
  //gap: 2rem 0;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto 1fr auto;
  justify-items: stretch;
  align-items: stretch;
  backface-visibility: hidden;
  border: 2px solid transparent;
  border-radius: 6px;
  z-index: 0;
`;
const CardBack = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: calc(100% - 60px);
  height: calc(100% - 60px);
  display: grid;
  padding: 30px 30px;
  //gap: 2rem 0;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto 1fr auto;
  justify-items: stretch;
  align-items: stretch;
  backface-visibility: hidden;
  border: 2px solid transparent;
  border-radius: 6px;
  transform: rotateX(180deg);
  z-index: 1;
`;

const Speech = styled.div`
  display: flex;
  gap: 0.25rem;
  justify-content: flex-start;
  grid-column: 1;
  grid-row: 1;
`;
const Span = styled.div`
  display: flex;
  justify-content: center;
  grid-column: 2;
  grid-row: 1;
`;
const Edit = styled.div`
  display: flex;
  justify-content: flex-end;
  grid-column: 3;
  grid-row: 1;
`;

const Term = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  grid-column: 1/span 3;
  grid-row: 2;
  font-size: 4rem;
  text-align: center ;
`;
const Shevrons = styled.div`
  display: flex;
  justify-content: flex-start;
  grid-column: 1/span 3;
  grid-row: 3;
  gap: 2rem;
`;

const Button1 = styled.button`
  display: flex;
  width: 50%;
  background: white;
  border-radius: 10px;
  justify-content: center;
  border: 2px solid black;
  cursor: grab;
`;

const ShufflePlay = styled.div`
  list-style-type: none;
  margin-top: 20px;
  margin-bottom: 1rem;
  padding: 0rem 2rem 1rem;
  border-bottom: 2px solid black;
`;

const Table = styled.table`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 26px;
  &&& {
    table,
    th,
    td {
      border-bottom: 2px solid black;
      border-collapse: collapse;
    }
    th,
    td,
    tr {
      padding: 15px;
    }
    th {
      text-align: left;
    }
    table {
      width: 100%;
    }
  }`;

