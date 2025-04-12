import Dexie, { Table } from 'dexie'
import { TodoItem, TodoStorageProvider } from '../components/todo'

export class IndexedDbTodoStorage extends Dexie implements TodoStorageProvider {
    todos!: Table<TodoItem, number>

    constructor() {
        super('TodoDatabase')
        this.version(1).stores({
            todos: '++id,text'
        })
    }

    onItemsLoad() {
        return this.todos.toArray()
    }
    onItemAdd(item: TodoItem) {
        return this.todos.add(item).then(() => Promise.resolve(item))
    }
    onItemUpdate(item: TodoItem) {
        return Promise.resolve(item)
    }
    onItemDelete(id: number) {
        return this.todos.delete(id)
    }
}