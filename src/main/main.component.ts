import { Component , OnInit , Output , EventEmitter} from '@angular/core';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})

export class MainComponent{
   
  @Output() localStorageClear = new EventEmitter<Boolean>();

  //toClear LocalStorage

  onClick(){
    this.localStorageClear.emit(true);
  }

}