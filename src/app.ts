import { Router } from './router';


const appEl = document.getElementById('app')!;
const router: Router = new Router(appEl);

// start page
router.goto('Login');

if (!appEl) {
    throw new Error('App element not found');
}

export { router }