import { TodoComponent, TodoBoostrapTheme } from '../components/todo';
import { IndexedDbTodoStorage } from '../storage/IndexedDbTodoStorage';
import { IPage } from './IPage';

export default class TodoPage implements IPage {
    #rootElement: HTMLElement;
    #todoComponent: TodoComponent;

    constructor() {
        this.#rootElement = document.createElement('div');
        this.#rootElement.classList.add('d-flex', 'flex-column', 'vh-100', 'bg-light');

        this.#todoComponent = new TodoComponent({
            theme: TodoBoostrapTheme,
            storage: new IndexedDbTodoStorage()
        });
    }

    mount(parentElement: HTMLElement): HTMLElement {
        // Create header
        const header = document.createElement('header');
        header.classList.add('p-3', 'bg-primary', 'text-white', 'shadow-sm');
        header.innerHTML = '<h1 class="m-0 fs-4">My Todo List</h1>';

        // Create main content area
        const mainContent = document.createElement('main');
        mainContent.classList.add('flex-grow-1', 'overflow-auto', 'p-3');

        // Mount todo component
        const todoWrapper = document.createElement('div');
        todoWrapper.setAttribute('id', 'todo-list');
        todoWrapper.classList.add('h-100', 'mx-auto', 'bg-white', 'rounded', 'shadow-sm');
        todoWrapper.style.maxWidth = '800px';
        this.#todoComponent.mount(todoWrapper);

        // Assemble the page
        this.#rootElement.appendChild(header);
        mainContent.appendChild(todoWrapper);
        this.#rootElement.appendChild(mainContent);

        // Mount to parent
        parentElement.appendChild(this.#rootElement);

        return this.#rootElement;
    }

    unmount(): void {
        // Clean up todo component
        // TODO implement better todo component disposal
        const todoWrapper = document.getElementById('todo-list');
        if (todoWrapper) {
            todoWrapper.innerHTML = '';
        }

        // Remove the root element
        if (this.#rootElement && this.#rootElement.parentElement) {
            this.#rootElement.parentElement.removeChild(this.#rootElement);
        }
    }
} 