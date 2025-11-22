export default class LoginPage{
    constructor(page){
        this.page = page;
        this.userBox = page.getByRole('textbox', {name:"Username"})
        this.passBox = page.getByRole('textbox', {name:"Password"})
        this.loginBtn = page.getByRole('button', {name:"Login"})

    }
}