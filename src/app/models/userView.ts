export class UserView {
    id: number;
    role_id: number;
    name: string;
    lastname: string;
    username: string;
    email: string;
    created_at: Date;
    

    constructor(id: number, role_id: number, name: string, lastname : string, username: string, email: string,created_at: Date ) {
       this.id=id;
       this.role_id=role_id;
       this.name=name;
       this.lastname=lastname;
       this.username=username;
       this.email=email;
       this.created_at=created_at;
    }
}
