export default class DashboardPage{
    constructor(page){
        this.page = page;
        this.dashboardHeader = page.getByRole("heading",{name:"Dashboard"});
        this.topBarHeader = page.locator('.oxd-topbar-header');
        this.selectedNavigation = page.locator('.active');
        this.actualWidgetNames = page.
        locator(".orangehrm-dashboard-widget .orangehrm-dashboard-widget-name > p");
        
    }
}
