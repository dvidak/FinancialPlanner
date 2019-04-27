export class RegistrationInfo {
    name: string;
    lastname: string;
    email: string;
    username: string;
    password: string;

    constructor(name: string, lastname: string, email: string,username: string,password: string) {
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.username = username;
        this.password = password;
    }
}
