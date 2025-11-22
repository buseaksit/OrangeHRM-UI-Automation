export default class PimPage{
    constructor(page){
        this.page = page;
        this.dropdownFilters = page.locator(".oxd-select-text");
        this.autoCompletInputBoxes = page.getByPlaceholder("Type for hints...");
        this.employeeNameInput = this.autoCompletInputBoxes.nth(0);
        this.searchBtn = page.getByRole("button",{name:"Search"});
        this.infoBanner = page.locator(".oxd-toast--info");
        this.infoMessage = page.locator(".oxd-text--toast-message");
        this.noRecsFound = page.getByText("No Records Found");
    }
}