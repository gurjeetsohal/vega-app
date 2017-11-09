import { Component , OnInit , Output , EventEmitter , ElementRef} from '@angular/core';

declare var vis: any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})

export class MainComponent implements OnInit{
   
  constructor(private element: ElementRef) {
    
  }
  
  @Output() localStorageClear = new EventEmitter<Boolean>();
  //toClear LocalStorage
  onClick(){
    this.localStorageClear.emit(true);
  }

  ngOnInit(){
    var items = new vis.DataSet(JSON.parse(localStorage.getItem("selected_employees")));

  // Configuration for the Timeline
  var options = {};

  // Create a Timeline
  var timeline = new vis.Timeline(this.element.nativeElement, items, options);
  }

}
  
