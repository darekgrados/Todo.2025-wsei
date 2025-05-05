import { IPage } from "./pages/IPage";

export class Router {
    #currentPage: string = '';
    #appEl: HTMLElement;
    #currentPageInstance: IPage | undefined;

    constructor(appEl: HTMLElement) {
        this.#appEl = appEl;
    }

    public goto(page: "Login" | "Todo" | "Start", params?: any): void {
        if (this.#currentPageInstance) {
            this.#currentPageInstance.unmount();
        }

        this.#currentPage = page;
        const pageEl = document.createElement('div');
        pageEl.id = page;

        console.log(`Navigating to ${page} page with params:`, params);
        import(`./pages/${page}Page`).then(module => {
            const pageInstance = new module.default(params);
            this.#currentPageInstance = pageInstance;
            pageInstance.mount(this.#appEl);
        });
    }

    currentPage(): string {
        return this.#currentPage;
    }
}