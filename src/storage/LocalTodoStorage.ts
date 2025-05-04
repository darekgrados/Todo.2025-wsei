import { TodoItem, TodoStorageProvider } from "../components/todo";

const STORAGE_KEY = "localStorage";

function getItemsFromLocalStorage(): TodoItem[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveItemsToLocalStorage(items: TodoItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export class LocalTodoStorage implements TodoStorageProvider {
  onItemsLoad() {
    return Promise.resolve(getItemsFromLocalStorage());
  }

  onItemAdd(item: TodoItem) {
    const items = getItemsFromLocalStorage();
    item.id = (items.reduce((max, i) => Math.max(max, i.id || 0), 0) || 0) + 1;
    items.push(item);
    saveItemsToLocalStorage(items);
    return Promise.resolve(item);
  }

  onItemUpdate(item: TodoItem) {
    const items = getItemsFromLocalStorage();
    const index = items.findIndex(i => i.id === item.id);
    if (index > -1) items[index] = item;
    saveItemsToLocalStorage(items);
    return Promise.resolve(item);
  }

  onItemDelete(id: number) {
    let items = getItemsFromLocalStorage();
    items = items.filter(i => i.id !== id);
    saveItemsToLocalStorage(items);
    return Promise.resolve();
  }
}