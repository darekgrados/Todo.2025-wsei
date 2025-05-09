export class TodoComponent {
  #rootEl: HTMLDivElement | undefined;
  #listEl: HTMLElement | undefined;
  #inputEl: HTMLTextAreaElement | undefined;

  #theme: TodoThemeSchema | undefined;
  #storage: TodoStorageProvider | undefined;

  constructor(options?: TodoOptions) {
    this.#theme = options?.theme;
    this.#storage = options?.storage;
  }

  mount(parent?: HTMLElement) {
    this.#rootEl = document.createElement('div');
    this.#rootEl.classList.add(...classUnify(this.#theme?.root ?? 'todo'));

    this.#listEl = document.createElement('ul');
    this.#listEl.classList.add(...classUnify(this.#theme?.list ?? 'todo-list'));

    const footerEl = document.createElement('form');
    footerEl.classList.add(...classUnify(this.#theme?.footer ?? 'todo-footer'));

    this.#inputEl = document.createElement('textarea');
    this.#inputEl.classList.add(...classUnify(this.#theme?.footer_input ?? ''));

    const addButtonEl = document.createElement('button');
    addButtonEl.textContent = 'Dodaj'
    addButtonEl.classList.add(...classUnify(this.#theme?.footer_addButton ?? ''));
    addButtonEl.addEventListener('click', (evt) => {
      this.addItem()
      evt.preventDefault()
    })

    this.#rootEl.appendChild(this.#listEl);
    this.#rootEl.appendChild(footerEl);
    footerEl.appendChild(this.#inputEl);
    footerEl.appendChild(addButtonEl);

    if (parent) parent.appendChild(this.#rootEl);

    this.#storage?.onItemsLoad().then(items => {
      items.forEach(item => {
        const todoItem: TodoItem = {
          text: item.text,
          isChecked: item.isChecked
        }
        this.addItem(todoItem.text);
      })
    })

    return this.#rootEl;
  }

  addItem(extText?: string) {
    if (!this.#inputEl || !this.#listEl) throw new Error('Component probaly not initialized!');

    const todoItem: TodoItem = {
      text: extText ? extText : this.#inputEl?.value ?? '',
      isChecked: false
    }

    const itemEl = document.createElement('li')
    itemEl.classList.add(...classUnify(this.#theme?.list_item ?? 'todo-item'));

    const checkEl = document.createElement('input');
    checkEl.type = 'checkbox'
    checkEl.addEventListener('change', () => {
      const itemDoneClass = this.#theme?.list_itemDone ?? 'todo-item-done'
      if (itemDoneClass) itemEl.classList.toggle(itemDoneClass);

      const itemDoneTextClass = this.#theme?.list_item_textDone || ''
      if (itemDoneTextClass) textEl.classList.toggle(itemDoneTextClass);
    });
    checkEl.classList.add(...classUnify(this.#theme?.list_item_check ?? ''))

    const textEl = document.createElement('div');
    textEl.textContent = todoItem.text;
    textEl.classList.add(...classUnify(this.#theme?.list_item_text ?? 'todo-item-text'));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Usuń";
    deleteButton.addEventListener("click", () => {
      this.#listEl!.removeChild(itemEl);
    });
    deleteButton.classList.add(...classUnify(this.#theme?.list_item_deleteButton ?? ''))

    const editButton = document.createElement("button");
    editButton.textContent = "Edytuj";
    editButton.dataset.mode = "readonly";
    editButton.classList.add(...classUnify(this.#theme?.list_item_editButton ?? ''))

    let textEditEl: HTMLTextAreaElement;
    editButton.addEventListener("click", () => {
      if (editButton.dataset.mode === "readonly") {
        textEditEl = document.createElement("textarea")
        textEditEl.value = textEl.textContent ?? "";
        textEditEl.classList.add(...classUnify(this.#theme?.list_item_textEditInput ?? ''))
        checkEl.after(textEditEl);
        textEl.classList.add(...classUnify(this.#theme?.hidden ?? 'hidded'));
        deleteButton.disabled = true;
        editButton.dataset.mode = "editing";
        editButton.textContent = "Zapisz";
      } else {
        textEl.textContent = textEditEl.value;
        textEl.classList.remove(...classUnify(this.#theme?.hidden ?? 'hidded'));
        itemEl.removeChild(textEditEl);
        deleteButton.disabled = false;
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

    this.#storage?.onItemAdd(todoItem);
  }
}

function classUnify(classList: string) {
  if (!classList) return []
  return classList.split(' ');
}

// Bootstrap
export const TodoBoostrapTheme: TodoThemeSchema = {
  root: 'd-flex flex-column h-100',
  list: 'list-group flex-grow-1 p-2',
  list_item: 'list-group-item d-flex',
  list_itemDone: '',
  list_item_check: 'form-check-input me-3',
  list_item_text: 'flex-grow-1 me-3',
  list_item_textDone: 'text-decoration-line-through',
  list_item_textEditInput: 'form-control me-3',
  list_item_deleteButton: 'btn btn-danger',
  list_item_editButton: 'btn btn-warning ms-1',
  footer: 'd-flex p-2',
  footer_input: 'form-control me-2',
  footer_addButton: 'btn btn-primary',
  hidden: 'd-none'
}

// Bulma
export const TodoBulmaTheme: TodoThemeSchema = {
  root: 'is-flex is-flex-direction-column',
  list: 'is-flex-grow-1 p-2',
  list_item: 'is-flex box is-align-items-center',
  list_itemDone: '',
  list_item_check: 'mr-3 no-materialize',
  list_item_text: 'is-flex-grow-1 mr-3',
  list_item_textDone: 'has-text-line-through',
  list_item_textEditInput: 'input mr-3',
  list_item_deleteButton: 'button is-danger',
  list_item_editButton: 'button is-warning ml-1',
  footer: 'is-flex p-2',
  footer_input: 'input mr-2',
  footer_addButton: 'button is-primary',
  hidden: 'is-hidden'
}

// Foundation
export const TodoFoundationTheme: TodoThemeSchema = {
  root: 'flex-container flex-dir-column',
  list: 'flex-child-grow p-2',
  list_item: 'callout primary flex-container flex-dir-row align-middle',
  list_itemDone: '',
  list_item_check: 'mr-2 no-materialize mt-16',
  list_item_text: 'flex-child-grow mr-2',
  list_item_textDone: 'has-text-line-through',
  list_item_textEditInput: 'input mr-2',
  list_item_deleteButton: 'button alert mt-16',
  list_item_editButton: 'button warning ml-1',
  footer: 'flex-container flex-dir-row align-middle p-2',
  footer_input: 'input mr-2 ml-1',
  footer_addButton: 'button primary',
  hidden: 'hide'
}

// Materialize
export const TodoMaterializeTheme: TodoThemeSchema = {
  root: 'd-flex flex-column',
  list: 'collection flex-grow-1',
  list_item: 'collection-item d-flex align-items-center',
  list_itemDone: '',
  list_item_check: 'filled-in mr-2 no-materialize mt-5',
  list_item_text: 'flex-grow-1 mr-2',
  list_item_textDone: 'has-text-line-through',
  list_item_textEditInput: 'input-field flex-grow-1 mr-2',
  list_item_deleteButton: 'btn red',
  list_item_editButton: 'btn orange lighten-1 ml-1',
  footer: 'd-flex align-items-center p-2',
  footer_input: 'input-field flex-grow-1 mr-2',
  footer_addButton: 'btn blue',
  hidden: 'hide'
}

// Tailwind
export const TodoTailwindTheme: TodoThemeSchema = {
  root: 'flex flex-col',
  list: 'flex-grow p-2 space-y-2',
  list_item: 'flex items-center border rounded p-2 shadow-sm',
  list_itemDone: '',
  list_item_check: 'mr-3 h-5 w-5 no-materialize',
  list_item_text: 'flex-grow mr-3',
  //list_item_textDone: 'line-through text-gray-400',
  list_item_textDone: 'has-text-line-through',
  list_item_textEditInput: 'border rounded mr-3 p-1',
  list_item_deleteButton: 'bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded',
  list_item_editButton: 'bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-1 px-3 rounded ml-1',
  footer: 'flex items-center p-2 border-t',
  footer_input: 'flex-grow border rounded mr-2 p-1',
  footer_addButton: 'bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-4 rounded',
  hidden: 'hidden'
}

export interface TodoOptions {
  theme: TodoThemeSchema,
  storage?: TodoStorageProvider
}

interface TodoThemeSchema {
  root?: string,
  list?: string,
  list_item?: string,
  list_itemDone?: string,
  list_item_check?: string,
  list_item_text?: string,
  list_item_textDone?: string,
  list_item_textEditInput?: string,
  list_item_deleteButton?: string,
  list_item_editButton?: string,
  footer?: string,
  footer_input?: string,
  footer_addButton?: string,
  hidden?: string
}

export interface TodoStorageProvider {
  onItemsLoad: () => Promise<TodoItem[]>
  onItemAdd: (item: TodoItem) => Promise<TodoItem>
  onItemUpdate: (item: TodoItem) => Promise<TodoItem>
  onItemDelete: (id: number) => Promise<void>
}

export interface TodoItem {
  id?: number
  text: string
  isChecked: boolean
}