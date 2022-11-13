import {useEffect, useState} from "react";

export default function (props) {

    const [options, setOptions] = useState([])

    useEffect(() => {
        let opts = [...props.quiz.incorrect_answers, props.quiz.correct_answer]
        setOptions(opts.sort((a, b) => 0.5 - Math.random()))
    }, [])

    return (
        <div className="single-question">
            <h3 className="text-base font-semibold text-gray-600"
                dangerouslySetInnerHTML={{__html: props.quiz.question}}></h3>
            <div className="mt-2 flex flex-wrap gap-3">
                {
                    options.map((opt, index) => (
                        <button key={index} dangerouslySetInnerHTML={{__html: opt}}
                                onClick={() => props.chooseAnswer(props.quizIndex, opt)}
                                disabled={props.revealAnswer}
                                className={`
                                    rounded-md border border-indigo-300 px-6 py-1 text-sm hover:border-indigo-600 active:scale-95 transition text-gray-600 hover:bg-indigo-100
                                    ${props.quiz.userAnswer === opt && !props.revealAnswer && '!bg-indigo-600 !text-white'}
                                    ${props.revealAnswer && props.quiz.correct_answer === opt && '!bg-green-600 !text-white'}
                                    ${props.revealAnswer && props.quiz.userAnswer === opt && props.quiz.correct_answer !== opt && '!bg-red-600 !text-white'}
                                 `}>
                        </button>
                    ))
                }

            </div>
        </div>
    )
}