class Todo {
    constructor(title, description, dueDate, priority, completed = false) {
        this.setTitle(title);
        this.setDescription(description);
        this.setDueDate(dueDate);
        this.setPriority(priority);
        this.completed = completed;
    }

    setTitle(title) {
        const newTitle = title.trim();

        if (newTitle === "") {
            throw new Error('Title cannot be empty')
        }

        this.title = newTitle
    }

    setDescription(description) {
        const newDescription = description.trim();

        if (newDescription === "") {
            throw new Error('Description cannot be empty')
        }

        this.description = newDescription
    }

    setPriority(priority) {
        const priorities = ['low', 'medium', 'high'];

        const newPriority = priority.toLowerCase();
        if (!priorities.includes(newPriority)) {
            throw new Error('Priority can ONLY be set to low, medium or high');
        }

        this.priority = newPriority;
        
    }

    setDueDate(dueDate) {
        const newDueDate = dueDate;

        if (isNaN(Date.parse(newDueDate))) {
            throw new Error("Date must be in the format of 'YYYY-MM-DD' ");
        }

        this.dueDate = newDueDate;
    }

    toggleComplete() {
        this.completed = !this.completed
    }

    updateTodo(changes) {
        const validKeys = ['title', 'description', 'dueDate', 'priority'];

        for (const key in changes) {
            if (!validKeys.includes(key)) {
                throw new Error('Invalid todo property');
            }

            else if (key === 'title') { this.setTitle(changes[key]) }
            else if (key === 'description') { this.setDescription(changes[key]) }
            else if (key === 'priority') { this.setPriority(changes[key]) }
            else if (key === 'dueDate') { this.setDueDate(changes[key]) }
            
            else {
                this[key] = changes[key]
            }
        }
    }
}

export default Todo;
