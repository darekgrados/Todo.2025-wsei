import { router } from '../app';
import { TodoComponent, TodoBoostrapTheme } from '../components/todo';
import { BackendTodoStorage } from '../storage/BackendTodoStorage';
import { IndexedDbTodoStorage } from '../storage/IndexedDbTodoStorage';
import { LocalTodoStorage } from '../storage/LocalTodoStorage';
import { IPage } from './IPage';

export default class TodoPage implements IPage {
    #rootElement: HTMLElement;
    #todoComponent: TodoComponent;

    constructor(params?: { storage?: string }) {
        this.#rootElement = document.createElement('div');
        this.#rootElement.classList.add('d-flex', 'flex-column', 'vh-100', 'bg-light');

        let storageProvider;
        const storageType = params?.storage;
        if (storageType === 'LocalStorage') {
            storageProvider = new LocalTodoStorage();
        } else if (storageType === 'IndexedDb') {
            storageProvider = new IndexedDbTodoStorage();
        } else {
            storageProvider = new BackendTodoStorage();
        }

        this.#todoComponent = new TodoComponent({
            theme: TodoBoostrapTheme,
            storage: storageProvider
        });
    }

    mount(parentElement: HTMLElement): HTMLElement {
        // Create header
        const header = document.createElement('header');
        header.classList.add('p-3', 'bg-primary', 'text-white', 'shadow-sm', 'd-flex', 'align-items-center');
        
        const titleEl = document.createElement('h1');
        titleEl.classList.add('m-0', 'fs-4');
        titleEl.textContent = 'My Todo List';
        header.appendChild(titleEl);

        // Create storage switch container with 3 buttons
        const storageSwitchContainer = document.createElement('div');
        storageSwitchContainer.classList.add('ms-auto', 'd-flex', 'gap-2');
        const storages = ['LocalStorage', 'IndexedDb', 'Backend'];
        storages.forEach(storage => {
            const btn = document.createElement('button');
            btn.classList.add('btn', 'btn-secondary');
            btn.textContent = storage;
            btn.addEventListener('click', () => {
                if (storage === 'Backend') {
                    router.goto('Login', { storage });
                } else {
                    router.goto('Todo', { storage });
                }
            });
            storageSwitchContainer.appendChild(btn);
        });
        header.appendChild(storageSwitchContainer);

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