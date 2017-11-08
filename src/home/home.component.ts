import { Component , OnInit , OnChanges} from '@angular/core';
import { EmployeeService } from "./employee.service";
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls : ['./home.component.css']
})
export class HomeComponent implements OnChanges{
  title = 'app';
  listFilter : string ;
  employees = [];
  addedEmployees = [];
  Submitted : boolean = false;

  constructor(private employeeService : EmployeeService , private router : Router){
      this.employees = this.employeeService.getEmployees();
  }
  

  ngOnChanges(){
     if(localStorage.getItem("selected_employees") === undefined){
       localStorage.setItem("selected_employees",JSON.stringify(this.addedEmployees));
       this.Submitted = false;
    }else{
      this.Submitted = true;
    }
  }
  
  
  userAdded(employee){
    this.listFilter = "";
    this.addedEmployees.push(employee);
    
    let index = this.employees.indexOf(employee);
    this.employees.splice(index,1);
    console.log(employee.name);
  }

  userRemoved(employee){
    let index = this.addedEmployees.indexOf(employee);
    this.employees.push(employee);
    this.addedEmployees.splice(index,1);
    console.log(this.addedEmployees);
  }

  onSucceed(){
    localStorage.setItem("selected_employees",JSON.stringify(this.addedEmployees));
    this.Submitted = true ;
    //this.router.navigate(['/main']);
    
  }
  localStorageClear(bool : Boolean){
    this.Submitted = false;
    localStorage.removeItem("selected_employees");
  }
}
