import { Component , OnInit , OnChanges ,DoCheck} from '@angular/core';
import { EmployeeService } from "./employee.service";
import { Router } from '@angular/router';
import { Employee } from './employee';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls : ['./home.component.css']
})
export class HomeComponent implements OnInit{
  title = 'app';
  listFilter : string ;
  employees = [];
  addedEmployees = [];
  Submitted : boolean = false;

  constructor(private employeeService : EmployeeService , private router : Router){
       this.employeeService.getEmployees().subscribe( (data : any) =>{
            
            //console.log(data._body);
            let parsedJSON = JSON.parse(data._body);
            
            for(let i = 0 ; i < parsedJSON.length ; i++){
                this.employees.push(new Employee(parsedJSON[i]));
            }
      });
  }
  

  ngOnInit(){
    this.employeeService.emp_obj_arr = this.employees;
    if(localStorage.getItem("selected_employees") == undefined){
       this.Submitted = false;
    }else{
      this.Submitted = true;
    }
    console.log("oninit invked");
    
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
    this.addedEmployees.push(employee.name);
    
    let index = this.employees.indexOf(employee);
    this.employees.splice(index,1);
    console.log(employee.name);
  }

  userRemoved(employee){
    let index = this.addedEmployees.indexOf(employee.name);
    this.employees.push(employee);
    this.addedEmployees.splice(index,1);
    console.log(this.addedEmployees);
  }

  onSucceed(){
    localStorage.setItem("selected_employees",JSON.stringify(this.addedEmployees));
    this.Submitted = true ;
    //this.router.navigate(['/main']);  
  }

  // localStorageClear(bool : Boolean){
  //   this.Submitted = false;
  //   localStorage.removeItem("selected_employees");
  // }

  updateLocalStorage(obj : any){ 
     this.addedEmployees = JSON.parse(localStorage.getItem("selected_employees"));
     this.Submitted = false;
  }
  
}
