import { backend } from "../app";
import { TodoItem, TodoStorageProvider } from "../components/todo";

export class BackendTodoStorage implements TodoStorageProvider {
    onItemsLoad() {
        return backend.getAllItems().then(items => { return items as TodoItem[] })
    }

    onItemAdd(item: TodoItem) {
        return backend.saveItem({
            text: item.text,
            isChecked: item.isChecked
        }).then(saved => {
            item.id = saved.id;
            return item;
        });
    }

    onItemUpdate(item: TodoItem) {
        return backend.saveItem({
            id: item.id,
            text: item.text,
            isChecked: item.isChecked
        }).then(() => item);
    }

    onItemDelete(id: number) {
        return backend.deleteItem(id);
    }
}