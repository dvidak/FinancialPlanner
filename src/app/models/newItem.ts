export class newItem {
    subcategory_id: number;
    description: string;
    amount: string;
    boughtAt: Date;
    boughtBy: string;
 

    constructor(subcategory_id: number, description: string, amount: string,boughtAt: Date, boughtBy: string) {
       this.subcategory_id=subcategory_id;
       this.description=description;
       this.amount=amount;
       this.boughtAt=boughtAt;
       this.boughtBy=boughtBy;
    }
}
