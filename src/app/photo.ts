export class Photo {
    id:number; 
    path:string;
    category:string;
    constructor(id:number, path:string,category:string){
        this.id = id;
        this.path = path; 
        this.category = category; 
    }
}