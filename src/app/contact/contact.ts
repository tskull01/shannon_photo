export class Contact {
    first:string; 
    last:string; 
    email:string; 
    subject:string; 
    message:string; 
    constructor(firstname:string, lastname:string,email:string,subject:string,message:string){
        this.first = firstname;
        this.last = lastname;
        this.email = email;
        this.subject = subject;
        this.message = message;
    }
}