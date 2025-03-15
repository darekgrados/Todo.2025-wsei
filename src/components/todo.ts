export class TodoComponent {
    #targetEl: HTMLElement | undefined;
    #listEl: HTMLElement | undefined;
    #footerEl: HTMLElement | undefined;
    #inputEl: HTMLTextAreaElement | undefined;
    #addButtonEl: HTMLButtonElement | undefined;

    mount(targetEl: HTMLElement) {
        this.#targetEl = targetEl
        this.#targetEl.classList.add('todo');

        this.#listEl = document.createElement('ul');
        this.#listEl.classList.add('todo-list');

        this.#targetEl.appendChild(this.#listEl);

        this.#footerEl = document.createElement('form');
        this.#targetEl.appendChild(this.#footerEl);

        this.#inputEl = document.createElement('textarea');
        this.#footerEl.appendChild(this.#inputEl);

        this.#addButtonEl = document.createElement('button');
        this.#addButtonEl.textContent = 'Dodaj'

        this.#addButtonEl.addEventListener('click', (evt) => {
            this.addItem()
            evt.preventDefault()
        })

        this.#footerEl.appendChild(this.#addButtonEl);
        this.#footerEl.classList.add('todo-footer');
    }

    addItem(extText?: string) {
        const itemEl = document.createElement('li')
        itemEl.classList.add('todo-item');

        itemEl.textContent = extText ? extText : this.#inputEl?.value ?? null

        if (this.#inputEl) this.#inputEl.value = ''
        else throw new Error('Component probaly not initialized!');

        if (this.#listEl) this.#listEl.appendChild(itemEl);
        else throw new Error('Component probaly not initialized!');
    }
}

export function putLog(message: string) {
    console.log(message)
}