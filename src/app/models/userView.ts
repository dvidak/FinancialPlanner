export class UserView {
    id: number;
    role_id: number;
    username: string;
    full_name: string;
    created_at: Date;
    

    constructor(id: number, role_id: number, username: string, full_name: string,created_at: Date ) {
       this.id=id;
       this.role_id=role_id;
       this.username=username;
       this.full_name=full_name;
       this.created_at=created_at;
    }
}
