import { Component , OnInit ,Input, Output , EventEmitter , ElementRef , OnChanges} from '@angular/core';
import { Employee } from '../home/employee';
import { EmployeeService } from "../home/employee.service";
import * as moment from 'moment';

declare var vis: any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls : ['./main.component.css']
})

export class MainComponent implements OnInit{
   
  employees = [];
  plannedLeave = [];
  leaveToday = [];
  addToEndDate : number = 7;
  currDate = "";
  availableResources : number;
  
  @Output() localStorageClear = new EventEmitter<Boolean>();
  @Output() updateLocalStorage = new EventEmitter();
  
  constructor(private employeeService : EmployeeService , private element : ElementRef){
       
  }
   
  //toClear LocalStorage
  onClearStorage(){
    this.localStorageClear.emit();
  }

  onUpdateStorage(){
      this.updateLocalStorage.emit();
  }
  



  localStorageArray = JSON.parse(localStorage.getItem("selected_employees"));
  visArray = []

  updateTimeline(){
    document.getElementById("timeline").innerHTML =""
    this.visTimelineConfiguration();
  } 

  ngOnInit(){

   this.employeeService.getEmployeesOnLeave().subscribe( (data : any) =>{
      
           // console.log(data._body);
            let parsedJSON = JSON.parse(data._body);
            
            for(let i = 0 ; i < parsedJSON.length ; i++){
                this.employees.push(new Employee(parsedJSON[i]));
            }
        
            for(let j = 0; j < this.localStorageArray.length ;j++){            
              for(let i = 0; i < this.employees.length ;i++){
                
                  let name =  this.employees[i].content;
                  name=name.replace(/\s/g,"");
                  if(name === this.localStorageArray[j].name.replace(/\s/g,"") ){
                        this.visArray.push(this.employees[i]);
                  }
              }
            }

          this.visTimelineConfiguration();  
          this.leaveInformation(); 
       });
    }

    visTimelineConfiguration(){  
      var items = new vis.DataSet(this.visArray);
    
      // Configuration for the Timeline
      let d = new Date();
      let currDate = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+(d.getDate()-1);
      this.currDate = currDate;
      var endDate = moment().add(this.addToEndDate,'d').format('l');
      endDate = endDate.split('/').join('-');
    //console.log("Moment date : "+endDate);

      let options = {
        min : currDate,
        max : endDate
      };
    
    
      this.visTimeline(items,options);
     
   } 
   
   visTimeline(items,options){
      // Create a Timeline
    //  var timeline = new vis.Timeline(this.element.nativeElement, items, options);
      var timeline = new vis.Timeline(document.getElementById('timeline'), items, options); 
   }

   leaveInformation(){
        
         for(let i = 0 ; i < this.visArray.length ; i++){
          
          this.plannedLeave.push(this.visArray[i].name);
          let startDate= this.visArray[i].start;
          startDate = startDate.slice(0,10);
            //console.log("start date : "+startDate);
            if(startDate === this.currDate){
                this.leaveToday.push(this.visArray[i].name);
                //console.log("he/she on leave : "+this.visArray[i].name)
            }
        }
    //    console.log(this.visArray.length)
    //    console.log(this.plannedLeave.length);
    //  console.log((((this.visArray.length)/(this.plannedLeave.length))*100));
    //   console.log(this.availableResources);

     }

}
  
