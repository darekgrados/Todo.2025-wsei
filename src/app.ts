import {
    TodoBoostrapTheme,
    TodoBulmaTheme,
    TodoFoundationTheme,
    TodoMaterializeTheme,
    TodoTailwindTheme,
    TodoComponent
} from "./components/todo";

const themes = {
    Default: TodoBoostrapTheme,
    Bootstrap: TodoBoostrapTheme,
    Bulma: TodoBulmaTheme,
    Foundation: TodoFoundationTheme,
    Materialize: TodoMaterializeTheme,
    Tailwind: TodoTailwindTheme
} as const;

const cssPathsInline = {
    Default: './css/todo-default.css?inline',
    Bootstrap: './css/bootstrap.scss?inline',
    Bulma: './css/bulma.css?inline',
    Foundation: './css/foundation.css?inline',
    Materialize: './css/materialize.css?inline',
    Tailwind: './css/tailwind.css?inline'
} as const;

const appEl = document.getElementById('app');
if (!appEl) {
    throw new Error("Nie znaleziono elementu #app");
}

const themeSelector = document.createElement('select');
themeSelector.classList.add('no-materialize');
Object.keys(themes).forEach(themeName => {
    const option = document.createElement('option');
    option.value = themeName;
    option.textContent = themeName;
    themeSelector.appendChild(option);
});
appEl.appendChild(themeSelector);

const todoWrapper = document.createElement('div');
todoWrapper.setAttribute('id', 'my-list');
appEl.appendChild(todoWrapper);

let currentTodo: TodoComponent | null = null;

async function loadTheme(themeName: keyof typeof themes) {
    document.querySelectorAll('style[data-dynamic-style]').forEach(el => el.remove());

    const cssPath = cssPathsInline[themeName];
    if (cssPath) {
        const cssModule = await import(cssPath);
        const cssContent = cssModule.default;
        const styleEl = document.createElement('style');
        styleEl.textContent = cssContent;
        styleEl.setAttribute('data-dynamic-style', themeName);
        document.head.appendChild(styleEl);
    }

    if (currentTodo && todoWrapper) {
        todoWrapper.className = '';
        todoWrapper.innerHTML = '';
    }

    currentTodo = new TodoComponent({
        theme: themes[themeName] || undefined
    });
    currentTodo.mount(todoWrapper);
}

loadTheme('Tailwind');
themeSelector.value = 'Tailwind';

themeSelector.addEventListener('change', (event) => {
    const selectedTheme = (event.target as HTMLSelectElement).value as keyof typeof themes;
    loadTheme(selectedTheme);
});
