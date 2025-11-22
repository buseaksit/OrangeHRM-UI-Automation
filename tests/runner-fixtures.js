import { test as base } from '@playwright/test';
import PimPage from '../pages/PimPage';
import AdminPage from '../pages/AdminPage';
import DashboardPage from '../pages/DashboardPage';

export const test = base.extend({
        quickNav: async({page},use) =>{
        const routes = 
         {  pimPage: 'web/index.php/pim/viewEmployeeList',
            adminPage: 'web/index.php/admin/viewSystemUsers',
            dashboardPage: 'web/index.php/dashboard/index'};
            await use(async(key) => page.goto(routes[key]));
        },
        dashboardPage: async({page},use)=>{
            const dash = new DashboardPage(page);
            await use(dash);
        },
        adminPage: async({page},use)=>{
            const admin = new AdminPage(page);
            await use(admin);
        },
        pimPage: async({page},use)=>{
            const pim = new PimPage(page);
            await use(pim);
        }


});
export {expect} from '@playwright/test';
test.beforeAll(() => console.log("Run Started..."));
test.beforeEach(async({page}) => {
    page.setViewportSize({width:1200,height:720});
});
test.afterEach(async({page},info)=>{
    if(info.status !== info.expectedStatus)
    {
        console.log("Test Has FAILED !!!!!");
    }
});
test.afterAll(()=>console.log("Execution is completed!!!"));