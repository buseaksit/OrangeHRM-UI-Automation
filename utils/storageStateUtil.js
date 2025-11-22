import { chromium } from '@playwright/test'
import {env} from './load_env.js'
import LoginPage from '../pages/LoginPage.js';
const STORAGE_PATH = env.STORAGE_PATH;
export async function refreshStorageState(){
    
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    const loginPage = new LoginPage(page);
    await loginPage.userBox.fill(env.OHRM_USER);
    await loginPage.passBox.fill(env.OHRM_PASS);
    await loginPage.loginBtn.click();

    //Wait for post-login url 
    await page.waitForURL('**/dashboard/index');

    await page.context().storageState({path: STORAGE_PATH});  // saving

    console.log(`Storage saved to ${STORAGE_PATH}`);

    await browser.close();
    return STORAGE_PATH;
    

}