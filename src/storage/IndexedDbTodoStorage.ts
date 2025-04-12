import Dexie from "dexie";
import { TodoItem, TodoStorageProvider } from "../components/todo";

export class IndexedDbTodoStorage extends Dexie implements TodoStorageProvider {
    todos!: Dexie.Table<TodoItem, number>;

    constructor() {
        super("TodoDatabase");
        this.version(1).stores({
            todos: "++id, text, isChecked"
        });
    }

    onItemsLoading() {
        return this.todos.toArray();
    }

    onItemAdd(item: TodoItem) {
        debugger;
        return Promise.resolve(item).then(() => Promise.resolve(item));
    }

    onItemUpdate(item: TodoItem) {
        debugger;
        return this.todos.put(item).then(() => Promise.resolve(item));
    }

    onItemDelete(id: number) {
        console.log(id);
        return this.todos.delete(id);
    };
}