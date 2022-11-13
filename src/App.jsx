import InitialModal from "./components/InitialModal.jsx";
import Question from "./components/Question";
import {useState} from "react";

function App() {
    const [quizStarted, setQuizStarted] = useState(false)
    const [quizLoading, setQuizLoading] = useState(false)

    // questions
    const [questions, setQuestions] = useState([])

    function startQuiz(apiForm) {
        setQuizLoading(true)
        fetch(`https://opentdb.com/api.php?amount=5&category=${apiForm.category}&difficulty=${apiForm.difficulty}`)
            .then((response) => response.json())
            .then((data) => {
                let quizs = data.results.map(quiz => (
                    {...quiz, userAnswer: ''}
                ))
                setQuestions(quizs)
                setQuizStarted(true)
                setQuizLoading(false)
            });
    }

    // choose answer
    const [correctAnsCount, setCorrectAnsCount] = useState(0)

    function chooseAnswer(quizIndex, ans){
        setQuestions(prevState => prevState.map((quiz, index) => quizIndex === index ? {...quiz, userAnswer: ans} : quiz))
    }

    // reveal answer
    const [revealAnswer, setRevealAnswer] = useState(false)

    function revealAllAnswer(){
        if(!questions.filter(quiz => !quiz.userAnswer).length){
            setRevealAnswer(true)
            setCorrectAnsCount(questions.filter(quiz => quiz.userAnswer === quiz.correct_answer).length)
        }else{
            alert('Answer all the questions')
        }
    }

    // restart game
    function restartQuiz(){
        setQuestions([])
        setCorrectAnsCount(0)
        setQuizStarted(false)
        setRevealAnswer(false)
    }

    return (
        <div>
            {
                quizStarted ?
                    <div
                        className="flex min-h-screen px-4 py-20 flex-col items-center justify-center bg-gradient-to-bl from-indigo-100 to-white">
                        <div className="w-full max-w-4xl rounded-2xl bg-white px-10 pb-12 pt-8 shadow-2xl">
                            <h1 className="border-b border-gray-200 pb-4 text-center text-4xl font-bold capitalize text-indigo-700">Quizziee</h1>

                            {/* Questions */}
                            <div className="mt-5 space-y-6">
                                {
                                    questions.map((quiz, index) => (
                                        <Question key={index} quiz={quiz} quizIndex={index} chooseAnswer={chooseAnswer} revealAnswer={revealAnswer} />
                                    ))

                                }
                            </div>

                            <div className="flex justify-end items-center gap-8 mt-8">
                                {
                                    revealAnswer &&
                                    <h4 className="text-green-500 font-bold text-2xl">
                                        {correctAnsCount} correct answer
                                    </h4>
                                }
                                {
                                    revealAnswer ?
                                    <button onClick={restartQuiz}
                                            className="rounded-md bg-gray-700 px-10 py-3 font-semibold text-white transition hover:bg-indigo-800 active:scale-95">
                                        Restart Quizziee
                                    </button>
                                        :
                                    <button onClick={revealAllAnswer}
                                        className="rounded-md bg-indigo-700 px-10 py-3 font-semibold text-white transition hover:bg-indigo-800 active:scale-95">
                                        Check Answers
                                    </button>
                                }

                            </div>
                        </div>
                    </div>
                    :
                    <InitialModal quizLoading={quizLoading} startQuiz={startQuiz}/>
            }


        </div>

    )
}

export default App
