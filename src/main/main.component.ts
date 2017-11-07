import { Component , OnInit} from '@angular/core';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})

export class MainComponent{
   
  //toClear LocalStorage

  onClick(){
    localStorage.setItem("selected_employees",JSON.stringify([]))
   
  }

}