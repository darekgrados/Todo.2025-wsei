import { TodoComponent, putLog } from "./components/todo";

putLog("Hello from main.ts");

const todo = new TodoComponent();

const appEl = document.getElementById("app")!;

const wrapper = document.createElement("div");

appEl!.appendChild(wrapper);

todo.mount(wrapper);
