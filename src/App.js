import React from "react"
import Header from "./components/Header"
import TodoItem from "./components/TodoItem"

class App extends React.Component {
    // props are immutable, cannot change prop inside a component
    // state is different, in that a component can store and maintain it's own data
    // NEEDS to be a class based component to have state
    constructor() {
        super()
        this.state = {
            todos: JSON.parse(window.localStorage.getItem('todoList')) || []
        }
        this.seedTodo = this.seedTodo.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    
    handleChange(id) {
        this.setState(prev => {
            const newTodos = this.state.todos.map(x => {
                if(x.id === id) {
                    return {
                        ...x,
                        completed: !x.completed
                    }
                }
                return x
            })
            
            window.localStorage.setItem('todoList', JSON.stringify(newTodos))

            return {
                todos: newTodos
            }
        })
    }

    seedTodo() {
        const todos = [
                {
                    id: 1,
                    text: "Take out the trash",
                    completed: false
                },
                {
                    id: 2,
                    text: "Grocery shopping",
                    completed: false
                },
                {
                    id: 3,
                    text: "Clean gecko tank",
                    completed: false
                },
                {
                    id: 4,
                    text: "Mow lawn",
                    completed: false
                },
                {
                    id: 5,
                    text: "Catch up on Arrested Development",
                    completed: false
                }
            ]
        if(window.localStorage.getItem('todoList') === null) {
            window.localStorage.setItem('todoList', JSON.stringify(todos))
            this.setState({todos})
        }
    }

    componentDidMount(){
        this.seedTodo()
    }

    render() {
        // const filteredTodos = this.state.todos.filter(x=>!x.completed)
        const todoComponents = this.state.todos.map(x => <TodoItem onChange={this.handleChange} item={x} key={x.id} />)
        return (
            <div>
                <Header />
                <div className="todo-list">
                    {todoComponents}
                </div>
            </div> 
        )
    }
}

export default App