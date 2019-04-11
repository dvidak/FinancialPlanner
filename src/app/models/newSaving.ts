export class newSaving {
    category_id: number;
    description: string;
    amount_init: string;
    amount: string;
    date: Date;
    created_by: string;
    created_with: string;
    
 
    constructor(category_id: number, description : string, amount_init : string, amount: string, date: Date, created_by : string, created_with : string) {
        this.category_id=category_id;
        this.description=description;
        this.amount=amount;
        this.amount_init=amount_init;
        this.date=date;
        this.created_by= created_by;
        this.created_with = created_with;
    }
}