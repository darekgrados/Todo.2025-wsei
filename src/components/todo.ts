export class TodoComponent {
  #rootEl: HTMLDivElement | undefined;
  #listEl: HTMLElement | undefined;
  #inputEl: HTMLTextAreaElement | undefined;

  #theme: TodoThemeSchema | undefined
  #storageProvider: TodoStorageProvider | undefined

  constructor(options?: TodoOptions) {
    this.#theme = options?.theme
    this.#storageProvider = options?.storage
  }

  mount(parentEl?: HTMLElement) {
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
      this.#addItem()
      evt.preventDefault()
    })

    this.#rootEl.appendChild(this.#listEl);
    this.#rootEl.appendChild(footerEl);
    footerEl.appendChild(this.#inputEl);
    footerEl.appendChild(addButtonEl);

    if (parentEl) {
      parentEl.appendChild(this.#rootEl)
    }

    this.#storageProvider?.onItemsLoad().then(items => {
      items.forEach(item => this.#addItem(item, false))
    })

    return this.#rootEl
  }

  addItem(text: string) {
    this.#addItem({
      text,
      isChecked: false
    }, false)
  }

  #addItem(todoItem?: TodoItem, addToStore: boolean = true) {
    const _todoItem: TodoItem = todoItem ?? {
      text: this.#inputEl?.value ?? '',
      isChecked: false
    }

    const listEl = this.#listEl;

    if (!this.#inputEl || !listEl) throw new Error('Component probaly not initialized!');

    const itemEl = document.createElement('li')
    itemEl.classList.add(...classUnify(this.#theme?.list_item ?? 'todo-item'));

    const checkEl = document.createElement('input');
    checkEl.type = 'checkbox'
    checkEl.checked = _todoItem.isChecked;
    
    checkEl.addEventListener('change', () => {
      const itemDoneClass = this.#theme?.list_itemDone ?? 'todo-item-done'
      if (itemDoneClass) itemEl.classList.toggle(itemDoneClass);

      const itemDoneTextClass = this.#theme?.list_item_textDone || ''
      if (itemDoneTextClass) textEl.classList.toggle(itemDoneTextClass);

      const data = itemEl.dataset.item;
      if (!data) return;
      const item = JSON.parse(data) as TodoItem;
      item.isChecked = checkEl.checked;
      this.#storageProvider?.onItemUpdate(item).then(updated => {
        itemEl.dataset.item = JSON.stringify(updated);
      });
    });
    checkEl.classList.add(...classUnify(this.#theme?.list_item_check ?? ''))

    const textEl = document.createElement('div');
    textEl.textContent = _todoItem.text
    textEl.classList.add(...classUnify(this.#theme?.list_item_text ?? 'todo-item-text'));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Usuń";
    deleteButton.addEventListener("click", () => {
      listEl.removeChild(itemEl);
      const data = itemEl.dataset.item;
      const item = JSON.parse(data!) as TodoItem;
      this.#storageProvider?.onItemDelete(item.id!)
    });
    deleteButton.classList.add(...classUnify(this.#theme?.list_item_deleteButton ?? ''))

    const itemDoneClass = this.#theme?.list_itemDone ?? 'todo-item-done';
    const itemDoneTextClass = this.#theme?.list_item_textDone ?? '';
    
    if (_todoItem.isChecked) {
      if (itemDoneClass) itemEl.classList.add(...classUnify(itemDoneClass));
      if (itemDoneTextClass) textEl.classList.add(...classUnify(itemDoneTextClass));
    }

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

        const data = itemEl.dataset.item;
        if (!data) return;
        const item = JSON.parse(data) as TodoItem;
        item.text = textEditEl.value;
        this.#storageProvider?.onItemUpdate(item).then(updated => {
          itemEl.dataset.item = JSON.stringify(updated);
        });
      }
    });

    itemEl.appendChild(checkEl)
    itemEl.appendChild(textEl)
    itemEl.appendChild(deleteButton)
    itemEl.appendChild(editButton)

    this.#inputEl.value = ''


    if (addToStore) {
      this.#storageProvider?.onItemAdd(_todoItem).then(item => {
        // item has id generated by storage provider.
        itemEl.dataset.item = JSON.stringify(item)
        listEl.appendChild(itemEl);
      })
    } else {
      // load scenario.
      if (_todoItem?.id ?? 0 > 0) {
        itemEl.dataset.item = JSON.stringify(_todoItem)
        listEl.appendChild(itemEl);
      } else {
        throw new Error('Item has no id and cannot be added!')
      }
    }
  }
}

function classUnify(classList: string) {
  if (!classList) return []
  return classList.split(' ');
}

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



interface TodoOptions {
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