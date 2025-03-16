export class TodoComponent {
  #listEl: HTMLElement | undefined;
  #inputEl: HTMLTextAreaElement | undefined;

  mount(targetEl: HTMLElement) {
    targetEl.classList.add('todo');

    this.#listEl = document.createElement('ul');
    this.#listEl.classList.add('todo-list');

    targetEl.appendChild(this.#listEl);

    const footerEl = document.createElement('form');
    targetEl.appendChild(footerEl);

    this.#inputEl = document.createElement('textarea');
    footerEl.appendChild(this.#inputEl);

    const addButtonEl = document.createElement('button');
    addButtonEl.textContent = 'Dodaj'

    addButtonEl.addEventListener('click', (evt) => {
      this.addItem()
      evt.preventDefault()
    })

    footerEl.appendChild(addButtonEl);
    footerEl.classList.add('todo-footer');
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

    const editButton = document.createElement("button");
    editButton.textContent = "Edytuj";
    editButton.dataset.mode = "readonly";

    let textEdit: HTMLTextAreaElement;
    editButton.addEventListener("click", () => {
      if (editButton.dataset.mode === "readonly") {
        textEdit = document.createElement("textarea")
        textEdit.value = textEl.textContent ?? "";
        checkEl.after(textEdit);
        textEl.classList.add("hidden");
        editButton.dataset.mode = "editing";
        editButton.textContent = "Zapisz";
      } else {
        textEl.textContent = textEdit.value;
        textEl.classList.remove("hidden");
        itemEl.removeChild(textEdit);
        editButton.dataset.mode = "readonly";
        editButton.textContent = "Edytuj";
      }
    });

    itemEl.appendChild(checkEl)
    itemEl.appendChild(textEl)
    itemEl.appendChild(deleteButton)
    itemEl.appendChild(editButton)

    this.#inputEl.value = ''
    this.#listEl.appendChild(itemEl);
  }
}