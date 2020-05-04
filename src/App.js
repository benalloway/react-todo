import React from "react"
import Header from "./components/Header"
import TodoItem from "./components/TodoItem"

function FormSubmit(props) {
    const style = {
        padding: "10px",
        display: "flex",
        justifyContent: "center"
    }
    return (
        <form style={style} className="todo-item" onSubmit={(e) => props.handleFormSubmit(e)}>
            <input placeholder="Create new todo" type="text" name="text" onChange={(e) => props.handleFormChange(e)} value={props.text} />
            <button type="submit">Create</button>
            <button onClick={() => props.handleClearForm()}>Clear</button>
        </form>
    )
}

class App extends React.Component {
    // props are immutable, cannot change prop inside a component
    // state is different, in that a component can store and maintain it's own data
    // NEEDS to be a class based component to have state
    constructor() {
        super()
        this.state = {
            todos:  [],
            todoForm: {
                text: ""
            }
        }
        this.seedTodo = this.loadTodos.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.createTodo = this.createTodo.bind(this)
        this.handleFormChange = this.handleFormChange.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleClearForm = this.handleClearForm.bind(this)
    }

    handleFormChange(event){
        const value = event.target.value
        this.setState({todoForm: {text: value}})
    }

    handleFormSubmit(event){
        event.preventDefault();
        this.createTodo();
        this.setState({
            todoForm: {
                text: ""
            }
        })
    }

    handleClearForm(event) {
        window.localStorage.clear("todoList")
        this.loadTodos()
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

    createTodo() {
        if (this.state.todoForm.text !== "") {
            let todos = this.state.todos
            let id = 0;
            todos.forEach(todo => {
            if (todo.id >= id) {
                id = todo.id + 1;
            }
            });
            
            const newTodo = {
                id: id,
                text: this.state.todoForm.text,
                completed: false
            }
            
            todos = [...todos, newTodo]
            
            window.localStorage.setItem('todoList', JSON.stringify(todos))
            this.loadTodos()
        }
    }

    loadTodos() {
        this.setState({
            todos: JSON.parse(window.localStorage.getItem('todoList')) || []
        })
    }

    componentDidMount(){
        this.loadTodos()
        // fetch("https://damp-feather-df5f.countries.workers.dev/?code=US")
        //     .then(response => response.json())
        //     .then(data => console.log(data))
    }

    render() {
        // const filteredTodos = this.state.todos.filter(x=>!x.completed)
        const todoComponents = this.state.todos.map(x => <TodoItem onChange={this.handleChange} item={x} key={x.id} />)
        return (
            <div>
                <Header />
                <div className="todo-list">
                    {todoComponents.length < 1 ? <h3>Create a todo...</h3> : todoComponents}
                </div>
                <div className="todo-list">
                    <FormSubmit text={this.state.todoForm.text} handleClearForm={this.handleClearForm} handleFormSubmit={this.handleFormSubmit} handleFormChange={this.handleFormChange} />
                </div>
            </div> 
        )
    }
}

export default App