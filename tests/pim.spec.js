import { expect, test } from './runner-fixtures.js';


test.describe("PIM Page Validations", () => {
    test('Selected Dropdown Filter Option Cannot Be Choosen', async({page,quickNav,pimPage})=>{
        // await page.goto("web/index.php/pim/viewEmployeeList");
        await quickNav('pimPage');
        const filters = [
            {label: "Employment Status", option: "Full-Time Permanent"},
            {label: "Include", option: "Current and Past Employees"},
            {label: "Job Title", option: "Chief Technical Officer"},
            {label: "Sub Unit", option: "OrangeHRM"}
        ];


        for(let i = 0; i<await pimPage.dropdownFilters.count(); i++){
            const {label, option} = filters[i];
            await pimPage.dropdownFilters.nth(i).click();

            const optionElement = 
            page.getByRole("option",{name:`${option}`});

            await optionElement.click();
            await pimPage.dropdownFilters.nth(i).click();

            await expect(optionElement).toHaveCSS("color","rgb(207, 211, 222)");

        }
    },
        /*
        Neg. 
        When no matching employee found with search criteria 
        Then No Records Found info banner should display on the bottom left
        And `No Records Found` element should display on the page 
        (scenario search with employee name that doesn't exist 
        and wait for info banner to be displayed)
        */
        // css class value -> .oxd-toast--info -> (for info banner)
        // css background-color -> rgb(30, 108, 235)
        // css class value for info message content -> .oxd-text--toast-message
        // css color for the content message -> rgb(255, 255, 255)
        // Employee Name input locator -> //label[text()="Employee Name"]/../following-sibling::div//input
        // OR -> //input[@placeholder="Type for hints..."] -> there is two of these
        // get the first one. 
        // Search button locator with role -> role: button and name: Search
        // No Records Found element -> find with text -> No Records Found
        // I will navigate to the PIM page
        // Send text on the employee name input box
        // Click on the search button
        // Validate that info banner with blue(rgb(30, 108, 235)) is displayed
        // Validate that info banner text content says -> No Records Found
        // Validate that element with text `No Records Found` is displayed. 
        test("No Employee Found With Employee Name",async({page,quickNav,pimPage})=>{
           // await page.goto("web/index.php/pim/viewEmployeeList");
            await quickNav('pimPage');

            await pimPage.employeeNameInput.fill("Hello");

            await pimPage.searchBtn.click();

            await expect(pimPage.infoBanner).toBeVisible();
            await expect(pimPage.infoBanner).toHaveCSS('background-color',"rgb(30, 108, 235)");
            await expect(pimPage.infoMessage).toHaveText("No Records Found");
            await expect(pimPage.infoMessage).toHaveCSS("color","rgb(255, 255, 255)")

            // Waith for info message to be not displayed(not exist in a page)
            await pimPage.infoMessage.waitFor({state: 'detached'});

            await expect(pimPage.noRecsFound).toBeVisible();
        })






)


})
