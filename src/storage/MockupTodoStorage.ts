import { TodoItem, TodoStorageProvider } from "../components/todo";

export class MockupTodoStorage implements TodoStorageProvider {
    onItemsLoading() {
        return Promise.resolve([])
    };

    onItemAdd(item: TodoItem) {
        debugger;
        return Promise.resolve(item);
    }
    onItemUpdate(item: TodoItem) {
        debugger;
        return Promise.resolve(item);
    }

    onItemDelete(id: number) {
        console.log(id);
        return Promise.resolve();
    };
}