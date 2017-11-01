import { Component , OnInit} from '@angular/core';
import { EmployeeService } from "./employee.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'app';
  listFilter : string ;

  employees = [];
  
  constructor(private employeeService : EmployeeService){
      this.employees = this.employeeService.getEmployees();
  }
  

  //employees = ["Gurjeet","Ritu","Nirmal","Hitesh","Naman","Himanshu"]
  addedEmployees = [];
  
  userAdded(employee){
    this.listFilter = "";
    this.addedEmployees.push(employee);

    let index = this.employees.indexOf(employee);
    this.employees.splice(index,1);
    console.log(employee);
  }

  userRemoved(user){
    let index = this.addedEmployees.indexOf(user);
    this.addedEmployees.splice(index,1);
    console.log(this.addedEmployees);
  }
}
