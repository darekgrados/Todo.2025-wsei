import { TodoBoostrapTheme, TodoBulmaTheme, TodoFoundationTheme, TodoMaterializeTheme, TodoComponent } from "./components/todo";

const appEl = document.getElementById('app');

const todoWrapper = document.createElement('div');
todoWrapper.setAttribute('id', 'my-list');

appEl?.appendChild(todoWrapper);

const todo = new TodoComponent({
    //theme: TodoBoostrapTheme
    //theme: TodoBulmaTheme
    //theme: TodoFoundationTheme
    theme: TodoMaterializeTheme
});

todo.mount(todoWrapper)
