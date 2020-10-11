export class User {
    public Id: number;
    public firstname: string;
    public lastname: string;
    public password:string;
    public email:string;
    public mobileno: number
    
    constructor(Id:number,firstname: string,lastname:string,password:string,email:string,mobileno:number) {
    this.Id = Id;
    this.firstname  = firstname;
    this.lastname = lastname;
    this.password = password;
    this.email = email;
    this.mobileno = mobileno;
    }
    }

    