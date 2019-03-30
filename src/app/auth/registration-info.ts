export class RegistrationInfo {
    username: string;
    full_name: string;
    password: string;

    constructor(username: string, full_name: string, password: string) {
        this.username = username;
        this.full_name = full_name;
        this.password = password;
    }
}
