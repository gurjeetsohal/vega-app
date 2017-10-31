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
  
  
  userAdded(employee){
    this.listFilter = employee;
    console.log(employee);
  }
}
