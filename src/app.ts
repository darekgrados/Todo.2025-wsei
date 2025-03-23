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
};

const cssImports = {
    Default: () => import('./css/app.css'),
    Bootstrap: () => import('./css/bootstrap.scss'),
    Bulma: () => import('./css/bulma.scss'),
    Foundation: () => import('./css/foundation.scss'),
    Materialize: () => import('./css/materialize.scss'),
    Tailwind: () => import('./css/tailwind.css')
};

const appEl = document.getElementById('app');

const themeSelector = document.createElement('select');
themeSelector.classList.add('no-materialize'); // Prevent Materialize from styling the select
Object.keys(themes).forEach(themeName => {
    const option = document.createElement('option');
    option.value = themeName;
    option.textContent = themeName;
    themeSelector.appendChild(option);
});

appEl?.appendChild(themeSelector);

const todoWrapper = document.createElement('div');
todoWrapper.setAttribute('id', 'my-list');
appEl?.appendChild(todoWrapper);

let currentTodo: TodoComponent | null = null;

async function loadTheme(themeName: keyof typeof themes) {
    document.querySelectorAll('[data-dynamic-style]').forEach(el => el.remove());

    if (themeName !== 'Default') {
        await cssImports[themeName]();
    }

    if (currentTodo && todoWrapper) {
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
