import { backend } from "../app";
import { TodoItem, TodoStorageProvider } from "../components/todo";

export class BackendTodoStorage implements TodoStorageProvider {
    onItemsLoad() {
        return backend.getAllItems().then(items => { return items as TodoItem[] })
    }
    onItemAdd(item: TodoItem) {
        debugger
        return Promise.resolve(item)
    }
    onItemUpdate(item: TodoItem) {
        debugger
        return Promise.resolve(item)
    }
    onItemDelete(id: number) {
        console.log(id)
        return Promise.resolve()
    }
}