class Project {
    constructor(name, todos = []) {
        this.setName(name);
        this.todos = todos;
    }

    setName(name) {
        const newName = name.trim();

        if (newName === "") {
            throw new Error("Name field must NOT be empty dammit!")
        }

        this.name = newName;
    }

    addTodo(todo) {
        this.todos.push(todo);
    };

    removeTodo(todo) {
        if (!this.todos.includes(todo)) {
            throw new Error("Make sure the todo you're trying to delete exists")
        }
        this.todos = this.todos.filter(item => item !== todo);
    };

    getTodos() {
        return this.todos;
    };

}

export default Project;
