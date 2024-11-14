export class Employee{
    empid : number;
    empname : string;
    empemail : string;
    empmobile : string;
    emppassword : string;
    empcity: string;
    empstatus : boolean

    constructor()
    {
        this.empid = 0;
        this.empname = "";
        this.empemail = "";
        this.empmobile = "";
        this.emppassword = "";
        this.empcity = "";
        this.empstatus = false;
    }

}