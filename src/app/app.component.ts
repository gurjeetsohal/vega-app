import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  listFilter : string ;

  employees = ["Gurjeet","Ritu","Nirmal","Hitesh","Naman","Himanshu"]
  addedEmployees = [];
  
  userAdded(employee){
    this.listFilter = "";
    this.addedEmployees.push(employee);
    console.log(employee);
  }
}
