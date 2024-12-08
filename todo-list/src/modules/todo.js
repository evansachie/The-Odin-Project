class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }

    markAsComplete() {
        this.completed = true;
    }

    changePriority(newPriority) {
        this.priority = newPriority;
    }
}

export default Todo;