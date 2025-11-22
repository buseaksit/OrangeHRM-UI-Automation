import AdminPage from "../pages/AdminPage.js";
import { expect, test } from "./runner-fixtures.js";

/* Validate Search Functionality
    entering `Admin` for Username and 
    search returns at least one row of result. 
*/


test.describe("Admin Page Validations", () => {
    test('Search Returns At Least One Row', async({page,quickNav,adminPage})=>{
        // await page.goto("web/index.php/admin/viewSystemUsers");
        await quickNav('adminPage');
        // Fill the username filter and click search
        await adminPage.uNameFilter.fill("Admin");

        await adminPage.searchBtn.click();

        await expect(adminPage.searchResultText).not.toContainText("No Records Found");
        expect(await adminPage.searchResultRows.count()).toBeGreaterThanOrEqual(1);

    });
/* Validate Add User Functionality
    Click `Add` btn on admin page
    You should see
        * User Role Dropdown
        * Status dropdown
        * Employee Name (With suggested values)
        * Username input field
        * Password and Confirm password input field. 
    All the values above should have * at the end to show they are required. 
    Validate that skipping any one of the fields above and 
    clicking the save button will generate an error message pop up with red 
    under the input fields. 
    For all that is missing it should say `Required` except for Confirm Password 
    it should say `Passwords do not match`. 

*/ 
    test('Add User: required field & error messages', async({page,quickNav, adminPage})=>{
        await quickNav('adminPage');
        await adminPage.addBtn.click();

        // presence of all required fields + red 
        const requiredFields =[
            {label: "User Role" },
            {label: "Employee Name"},
            {label: "Status"},
            {label: "Username"},
            {label: "Password"},
            {label: "Confirm Password"}
        ]
         // //label/../following-sibling::div

         for(let {label} of requiredFields){
            let requiredField = 
            adminPage.getRequiredField(label);
             await expect(requiredField).toBeVisible();
            if(label !== "User Role" && label !== "Status"){
                // these are input fields. 
                await expect(requiredField.locator("input")).toBeVisible();
            }
           
         }
         // Let's leave everything blank and click save. 
         await adminPage.saveBtn.click();

         for(let i = 0; i < requiredFields.length ; i++){
            let {label} = requiredFields[i];
            let message = label === "Confirm Password"
            ? 'Passwords do not match' : 'Required';
            
            await expect(adminPage.errorNode.nth(i)).toHaveText(message);

         }
    });



   /* 
   Feature: Admin Page ‒ User Management

  The Admin page lets HR managers maintain employee login accounts.
  These scenarios cover creating, validating, updating, and removing users
  from the *gadmin* (administration) module.

  # 1️⃣ Happy path – create two accounts and verify via search
  Scenario: Add Admin and ESS users, then confirm in search results
    Given I log in as an Admin user
    When I open the Admin > User Management page
    And I create a new user with:
      | User Role | Employee Name | Username  | Status |
      | Admin     | Linda Brown   | linda.b   | Enabled |
    And I create another user with:
      | User Role | Employee Name | Username  | ess.pat | 
      | ESS       | Pat Miller    | ess.pat   | Enabled |
    And I search for username "linda.b"
    Then the results table shows a row with:
      | Username | User Role | Employee Name | Status | Actions |
      | linda.b  | Admin     | Linda Brown   | Enabled | Edit • Delete |
    And I search for username "ess.pat"
    Then the results table shows a row with:
      | Username | User Role | Employee Name | Status | Actions |
      | ess.pat  | ESS       | Pat Miller    | Enabled | Edit • Delete |


  # 3️⃣ Negative path – duplicate usernames are rejected
  Scenario: Reject creation of a user with an existing username
    Given a user "linda.b" already exists
    When I attempt to create another user with username "linda.b"
    Then I see the validation error "Username already exists"

  # 4️⃣ Update – change a user’s role from ESS to Admin
  Scenario: Edit user role successfully
    Given user "ess.pat" has role "ESS"
    When I edit user "ess.pat" and change the role to "Admin"
    And I save the changes
    Then the search results for "ess.pat" show User Role "Admin"

  # 5️⃣ Status toggle – disable and filter
  Scenario: Disable a user and verify status filter
    Given user "linda.b" is Enabled
    When I disable user "linda.b"
    And I set the search filter Status to "Disabled"
    Then "linda.b" appears in the filtered results with Status "Disabled"

  # 6️⃣ Deletion – remove a user account
  Scenario: Delete a user and ensure it is no longer searchable
    Given user "ess.pat" exists
    When I delete user "ess.pat"
    And I search for username "ess.pat"
    Then the table shows "No Records Found"

    */ 

});