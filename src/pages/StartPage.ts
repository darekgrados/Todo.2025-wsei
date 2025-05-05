import { router } from "../app";
import { IPage } from "./IPage";

export default class StartPage implements IPage {
    #rootEl: HTMLElement | undefined;

    mount(parentEl: HTMLElement): HTMLElement {
        this.#rootEl = document.createElement('div');
        this.#rootEl.classList.add('d-flex', 'flex-column', 'align-items-center', 'justify-content-center', 'vh-100');

        const title = document.createElement('h1');
        title.textContent = 'Wybierz rodzaj magazynu';
        this.#rootEl.appendChild(title);

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('d-flex', 'gap-3', 'mt-4');

        const options = ['LocalStorage', 'IndexedDb', 'Backend'];
        options.forEach(option => {
            const btn = document.createElement('button');
            btn.textContent = option;
            btn.classList.add('btn', 'btn-secondary');
            btn.addEventListener('click', () => {
                console.log(`Wybrano: ${option}`);
                if (option === 'Backend') {
                    router.goto('Login', { storage: option });
                } else {
                    router.goto('Todo', { storage: option });
                }
            });
            buttonsContainer.appendChild(btn);
        });

        this.#rootEl.appendChild(buttonsContainer);
        parentEl.appendChild(this.#rootEl);

        return this.#rootEl;
    }

    unmount(): void {
        if (this.#rootEl) {
            this.#rootEl.remove();
            this.#rootEl = undefined;
        }
    }
}