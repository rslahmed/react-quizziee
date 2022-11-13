import {useState} from "react";

export default function (props) {

    const categories = [
        {
            id: 9,
            name: 'General Knowledge',
        },
        {
            id: 17,
            name: 'Science & Nature',
        },
        {
            id: 21,
            name: 'Sports',
        },
        {
            id: 23,
            name: 'History',
        },
    ]

    const difficulties = [
        {
            id: 1,
            value: 'easy',
            name: 'Easy',
        },
        {
            id: 2,
            value: 'medium',
            name: 'Medium',
        },
        {
            id: 3,
            value: 'hard',
            name: 'Hard',
        },
    ]

    // Api form
    const [apiForm, setApiForm] = useState({
        category: '',
        difficulty: ''
    })

    function handleFormUpdate(event) {
        const {name, value} = event.target
        setApiForm(prevState => (
            {
                ...prevState,
                [name]: value
            }
        ))
    }

    function submit(event) {
        event.preventDefault()
        props.startQuiz(apiForm)
    }

    return (
        <div
            className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-bl from-indigo-100 to-white">
            <form onSubmit={submit}
                  className="w-full max-w-sm rounded-2xl px-10 pb-12 pt-8 text-center shadow-2xl bg-white">
                <h1 className="text-4xl font-bold capitalize text-indigo-700">Quizziee</h1>
                <p className="mt-2 max-w-xs px-10 text-center text-xs text-gray-400">Choose category and difficulty
                    level then answer the questions.</p>

                <div className="mt-8 text-left">
                    <label className="block text-sm text-gray-500">Select category: </label>
                    <select
                        name="category" required
                        value={apiForm.category}
                        onChange={(event) => handleFormUpdate(event)}
                        className="mt-1 block w-full rounded-md border-gray-200 bg-white py-2.5 pl-4 pr-12 text-sm text-gray-500 shadow-md"
                    >
                        <option value="">choose...</option>
                        {
                            categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="mt-4 text-left">
                    <label className="block text-sm text-gray-500">Select difficulty: </label>
                    <select
                        name="difficulty" required
                        value={apiForm.difficulty}
                        onChange={(event) => handleFormUpdate(event)}
                        className="mt-1 block w-full rounded-md border-gray-200 bg-white py-2.5 pl-4 pr-12 text-sm text-gray-500 shadow-md">
                        <option value="">choose...</option>
                        {
                            difficulties.map(diff => (
                                <option key={diff.id} value={diff.value}>{diff.name}</option>
                            ))
                        }
                    </select>
                </div>
                <button disabled={props.quizLoading}
                        className="mt-8 flex items-center justify-center w-full rounded-md bg-indigo-700 px-10 py-3 font-semibold text-white transition hover:bg-indigo-800 active:scale-95">
                    {
                        props.quizLoading &&
                        <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                  d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
                                  opacity=".5"/>
                            <path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z">
                                <animateTransform attributeName="transform" dur="1s" from="0 12 12"
                                                  repeatCount="indefinite" to="360 12 12" type="rotate"/>
                            </path>
                        </svg>
                    }
                    {props.quizLoading ? 'Quiz loading' : 'Start Quiz'}
                </button>
            </form>
        </div>
    )
}