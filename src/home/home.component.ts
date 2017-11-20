import { Component , OnInit , OnChanges ,DoCheck, AfterContentChecked} from '@angular/core';
import { EmployeeService } from "./employee.service";
import { Router } from '@angular/router';
import { Employee } from './employee';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls : ['./home.component.css']
})
export class HomeComponent implements OnInit,AfterContentChecked{
  title = 'app';
  listFilter : string ;
  employees = [];
  addedEmployees = [];
  Submitted : boolean = false;

  constructor(private employeeService : EmployeeService , private router : Router){
   
    //console.log("constructor invoked");
       this.employeeService.getEmployeesInfo().subscribe( (data : any) =>{
          //console.log("dat taken fron service",this.employees);
            //console.log(data._body);
            let parsedJSON = JSON.parse(data._body);
            
            for(let i = 0 ; i < parsedJSON.length ; i++){
              
                this.employees.push(new Employee(parsedJSON[i]));
            }
           // console.log("dat taken fron service employees array"+this.employees);
      });
  }
  

  ngOnInit(){
    //this.employeeService.emp_obj_arr = this.employees;
    if(localStorage.getItem("selected_employees") == undefined){
       this.Submitted = false;
    }else{
      this.Submitted = true;
    }
     // console.log("oninit invked");
    
  }

  ngAfterContentChecked(){
  // debugger;
 //console.log("do check invoked");
    for(let i = 0 ; i < this.addedEmployees.length; i++){
      for(let j = 0 ; j < this.employees.length ; j++){
        let str1 = this.addedEmployees[i].name;
        let str2 = this.employees[j].name;
          str1= str1.replace(/\s/g,"");
          str2= str2.replace(/\s/g,"");
          if(str1 == str2){
            
            //console.log(str1+"name found")
             this.employees.splice(j,1);
             break;
          }
        }
     }
  }

  // ngDoCheck(){
  //   if(localStorage.getItem("selected_employees") == undefined){
  //     console.log("docheck inside")
  //     this.Submitted = false;
  //   }
  //   console.log("Docheck invked");
  // }
  
  
  userAdded(employee){
      this.listFilter = "";
      this.addedEmployees.push(employee);
      let index = this.employees.indexOf(employee);
      this.employees.splice(index,1);
      //console.log(employee.name);
  }

  userRemoved(employee){
    let index = this.addedEmployees.indexOf(employee);
    this.employees.push(employee);
    this.addedEmployees.splice(index,1);
    //console.log(this.addedEmployees);
  }

  onSucceed(){
    localStorage.setItem("selected_employees",JSON.stringify(this.addedEmployees));
    this.Submitted = true ;
    //this.router.navigate(['/main']);  
  }

  localStorageClear(){
    this.Submitted = false;
    localStorage.removeItem("selected_employees");
  }

  updateLocalStorage(){

     this.addedEmployees = JSON.parse(localStorage.getItem("selected_employees"));
     this.Submitted = false;
  }
  
}
