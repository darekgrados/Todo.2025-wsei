import { TodoBoostrapTheme, TodoBulmaTheme, TodoFoundationTheme, TodoComponent } from "./components/todo";

const appEl = document.getElementById('app');

const todoWrapper = document.createElement('div');
todoWrapper.setAttribute('id', 'my-list');

appEl?.appendChild(todoWrapper);

const todo = new TodoComponent({
    //theme: TodoBoostrapTheme
    //theme: TodoBulmaTheme
    theme: TodoFoundationTheme
});

todo.mount(todoWrapper)
