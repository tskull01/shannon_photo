export class Photo {
    id:number; 
    path:string;
    category:string;
    loaded:boolean; 
    constructor(id:number, path:string,category:string,loaded:boolean){
        this.id = id;
        this.path = path; 
        this.category = category; 
        this.loaded = loaded;
    }
}