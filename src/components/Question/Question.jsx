import React from "react"
import {nanoid} from "nanoid"
import he from 'he'
import tickIcon from "../../assets/images/tick.svg"
import crossIcon from "../../assets/images/cross.svg"
import "./Question.css"

const Question=props=>{
    const incorrectAnswersElements=props.incorrectAnswers.map(answer=>{
        const incorrectAnswerClassName=`${props.selectedAnswer===answer ? "question-btn-selected" : "question-btn"}
        ${(props.showAnswer && props.selectedAnswer === answer) && "question-btn-incorrect"}`

        return(
            <button
                key={nanoid()}
                className={incorrectAnswerClassName}
                onClick={()=>props.handleSelectAnswer(props.id,answer)}
            >
                {he.decode(answer)}
            </button>
        )
    })

    const correctAnswerClassName=`
        ${props.selectedAnswer === props.correctAnswer ? "question-btn-selected" : "question-btn"}
        ${props.showAnswer && "question-btn-correct"}
    `

    const correctAnswerElement=
        <button
            key={nanoid()}
            className={correctAnswerClassName}
            onClick={()=>props.handleSelectAnswer(props.id,props.correctAnswer)}
        >
            {he.decode(props.correctAnswer)}
        </button>

    incorrectAnswersElements.push(correctAnswerElement)

    const sortedAnswerElements = incorrectAnswersElements.sort((a,b)=>(
        a.props.children.localeCompare(b.props.children)
    ))

    return(
        <article className="question-container">
            <div>
                <h3 className="question-text">{he.decode(props.question)}</h3>
                {sortedAnswerElements}
            </div>
            {
                props.showAnswer && (
                    props.selectedAnswer && props.correctAnswer
                        ? <img src={tickIcon} width={35} alt={"Tick, correct answer"}/>
                        : <img src={crossIcon} width={30} alt="Cross, wrong answer"/>
                )
            }
        </article>
    )
}

export default Question;