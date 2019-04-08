export class ItemView {
    id: number;
    subcategory_id: number;
    description: string;
    amount: string;
    boughtAt: Date;
    boughtBy: number;
    subcategory: {
        name: string;
    }
 

    constructor(id: number, subcategory_id: number, description: string, amount: string,boughtAt: Date, boughtBy: number) {
       this.id=id;
       this.subcategory_id=subcategory_id;
       this.description=description;
       this.amount=amount;
       this.boughtAt=boughtAt;
       this.boughtBy=boughtBy;
       this.subcategory.name= this.subcategory.name;
    }
}
