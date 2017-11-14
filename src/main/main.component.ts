import { Component , OnInit ,Input, Output , EventEmitter , ElementRef} from '@angular/core';
import { Employee } from '../home/employee';
import { EmployeeService } from "../home/employee.service";


declare var vis: any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})

export class MainComponent implements OnInit{
   
  employees = [];
  
  @Output() localStorageClear = new EventEmitter<Boolean>();
  @Output() updateLocalStorage = new EventEmitter();
  
  constructor(private employeeService : EmployeeService , private element : ElementRef){
 
  }
   
  //toClear LocalStorage
  onClearStorage(){
    this.localStorageClear.emit(true);
  }

  onUpdateStorage(){
      this.updateLocalStorage.emit({addedEmployees : this.visArray , bool : true});
  }
  



  localStorageArray = JSON.parse(localStorage.getItem("selected_employees"));
  visArray = []

  ngOnInit(){
   
   this.employeeService.getEmployeesOnLeave().subscribe( (data : any) =>{
      
            console.log(data._body);
            let parsedJSON = JSON.parse(data._body);
            
            for(let i = 0 ; i < parsedJSON.length ; i++){
                this.employees.push(new Employee(parsedJSON[i]));
            }
        
            for(let j = 0; j < this.localStorageArray.length ;j++){            
              for(let i = 0; i < this.employees.length ;i++){
                
                  let name =  this.employees[i].content;
                  name=name.replace(/\s/g,"");
                  if(name === this.localStorageArray[j].replace(/\s/g,"") ){
                        this.visArray.push(this.employees[i]);
                  }
              }
            }

            
          var items = new vis.DataSet(this.visArray);
        
          // Configuration for the Timeline
          var options = {};
        
          // Create a Timeline
        //  var timeline = new vis.Timeline(this.element.nativeElement, items, options);
        var timeline = new vis.Timeline(document.getElementById('timeline'), items, options);
          
   });

   


 }
}
  
