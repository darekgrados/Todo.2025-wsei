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
        if (!this.#inputEl || !this.#listEl) throw new Error('Component probaly not initialized!');

        const itemEl = document.createElement('li')
        itemEl.classList.add('todo-item');

        const checkEl = document.createElement('input');
        checkEl.type = 'checkbox'
        checkEl.addEventListener('change', () => {
            itemEl.classList.toggle('todo-item-done');
        });

        const textEl = document.createElement('div');
        textEl.textContent = extText ? extText : this.#inputEl?.value ?? null
        textEl.classList.add('todo-item-text')

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Usuń";
        deleteButton.addEventListener("click", () => {
            this.#listEl!.removeChild(itemEl);
        });

        itemEl.appendChild(checkEl)
        itemEl.appendChild(textEl)
        itemEl.appendChild(deleteButton)

        this.#inputEl.value = ''
        this.#listEl.appendChild(itemEl);
    }
}

export function putLog(message: string) {
    console.log(message)
}