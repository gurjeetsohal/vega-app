export class Employee{
     name : string ;
     username : string;
     content : string;
     id : number;
     start : string;
     end : string;

     constructor(object){
        this.name = object.content;
        this.content = object.content; 
        this.id = object.id;
        this.start = object.start;
        this.end = object.end;
     }

     getEmployeeDetails(){
          
     }
}