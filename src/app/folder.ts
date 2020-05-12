export class Folder {
    id:number; 
    name:string; 
    order:string;
    displayName:string;
    displayPhoto:string; 
    constructor(id:number, name:string,order:string, displayName:string,displayPhoto:string){
        this.id = id;
        this.name = name; 
        this.order = order; 
        this.displayName = displayName;
        this.displayPhoto = displayPhoto;
    }
}