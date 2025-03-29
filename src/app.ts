import { TodoBoostrapTheme, TodoComponent } from "./components/todo";
import { IndexedDbTodoStorage } from "./storage/IndexedDbTodoStorage";
// import { MockupTodoStorage } from "./storage/MockupTodoStorage";

const appEl = document.getElementById('app');

const todoWrapper = document.createElement('div');
todoWrapper.setAttribute('id', 'my-list');

appEl?.appendChild(todoWrapper);

const todo = new TodoComponent({
    theme: TodoBoostrapTheme,
    storage: new IndexedDbTodoStorage()
});

todo.mount(todoWrapper)
