import { test, expect} from './runner-fixtures.js';

// Adding multiple tests into single section

test.describe('Orange HRM Dashboard Validations',()=>{
    // we are going to create individual tests in this section.
    /* 1. validate dashboard text on top left is visible in white
          Validate that orange banner is in behind of dashboard
          Validate that on the left menu Dashboard color of the text is white. 
    */
   test('renders dashboard page', async({page,quickNav,dashboardPage })=>{
    // await page.goto('web/index.php/dashboard/index'); // URL is relative to baseURL.
    await quickNav('dashboardPage');
    await expect(dashboardPage.dashboardHeader).toHaveCSS("color","rgb(255, 255, 255)");
    await expect(dashboardPage.topBarHeader).toHaveCSS("background-image",
        'linear-gradient(90deg, rgb(255, 146, 11) 0px, rgb(243, 92, 23) 90%)');
    await expect(dashboardPage.selectedNavigation).toHaveText("Dashboard");
    await expect(dashboardPage.selectedNavigation).toHaveCSS("color","rgb(255, 255, 255)");

   }) 
   /* Validate that 
    1. Dashboard page contains widgets for 
        * Time at Work
        * My Actions
        * Quick Launch
        * Buzz Latest Posts
        * Employees on Leave Today
        * Employee Distribution by Sub Unit
        * Employee Distribution by Location
    2. Validate that title for each widget has the color "rgb(100, 114, 140)"
    Note: This is not to test widget functionality etc. Just validate that titles for
    each widget exists and displayed in expected color. 
   */

    test("Validate Widget Titles",async({page,quickNav,dashboardPage})=>{

       //  await page.goto("web/index.php/dashboard/index");
        await quickNav("dashboardPage")
        const expectedWidgetTitles = [
            "Time at Work",
            "My Actions",
            "Quick Launch",
            "Buzz Latest Posts",
            "Employees on Leave Today",
            "Employee Distribution by Sub Unit",
            "Employee Distribution by Location"
        ];


        for (let i = 0; i < expectedWidgetTitles.length; i++) {

            await expect(dashboardPage.actualWidgetNames.nth(i))
              .toHaveText(expectedWidgetTitles[i]);
          
            await expect(dashboardPage.actualWidgetNames.nth(i))
              .toHaveCSS("color", "rgb(100, 114, 140)");
          }
        
    });


});