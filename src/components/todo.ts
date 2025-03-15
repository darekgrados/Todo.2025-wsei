export class TodoComponent {
    #targetEl: HTMLElement | undefined;
    #listEl: HTMLElement | undefined;
    #footerEl: HTMLElement | undefined;
    #inputEl: HTMLTextAreaElement | undefined;
    #addButtonEl: HTMLElement | undefined;

    mount(targetEl: HTMLElement) {
        this.#targetEl = targetEl

        this.#listEl = document.createElement('ul');
        this.#listEl.classList.add('todo-list');
        this.#targetEl.appendChild(this.#listEl);

        this.#footerEl = document.createElement('form');
        this.#footerEl.classList.add('todo-footer');
        this.#targetEl.appendChild(this.#footerEl);

        this.#inputEl = document.createElement('textarea');
        this.#inputEl.classList.add('todo-input');
        this.#footerEl.appendChild(this.#inputEl);
        
        this.#addButtonEl = document.createElement('button');
        this.#addButtonEl.classList.add('todo-button');
        this.#addButtonEl.textContent = 'Dodaj';

        this.#addButtonEl.addEventListener('click', (evt) => {
            this.addItem()
            evt.preventDefault()
        })

        this.#footerEl.appendChild(this.#addButtonEl);
    }

    addItem(extText?: string) {
        const itemEl = document.createElement('li')
        itemEl.textContent = extText ? extText : this.#inputEl?.value ?? null;

        if(this.#inputEl) this.#inputEl.value = '';
        else throw new Error('Component seems to be not mounted yet!');

        if(this,this.#listEl) this.#listEl.appendChild(itemEl); 
        else throw new Error('Component seems to be not mounted yet!');
    }
}

export function putLog(message: string) {
    console.log('LOG: ', message);
}