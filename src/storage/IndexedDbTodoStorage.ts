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
        return Promise.resolve([])
    }

    onItemAdd(item: TodoItem) {
        debugger
        return this.todos.add(item).then(() => Promise.resolve(item))
    }

    onItemUpdate(item: TodoItem) {
        debugger
        return Promise.resolve(item)
    }

    onItemDelete(id: number) {
        debugger
        return this.todos.delete(id)
    }
}