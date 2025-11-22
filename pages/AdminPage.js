export default class AdminPage{
    constructor(page){
        this.page = page;
        this.uNameFilter = page.locator(".oxd-form-row .oxd-input");
        this.searchBtn = page.getByRole("button",{name: "Search"});
        this.searchResultText = page.locator("//hr/following-sibling::div/span");
        this.searchResultRows = page.locator(".oxd-table-body .oxd-table-row");
        this.addBtn = page.getByRole("button",{name:" Add"});
        this.saveBtn= page.getByRole("button",{name:"Save"})
        this.errorNode = page.locator(".oxd-input-field-error-message")
    }
     getRequiredField(label) {
        return this.page.locator(
            `(//label[contains(text(),"${label}")]/../following-sibling::div)[1]`
        );

}}
