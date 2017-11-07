import { BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }from "@angular/forms"
import { RouterModule }from '@angular/router';
import { AppComponent } from './app.component';
import { EmployeeFilterPipe } from '../home/employee-filter.pipe';
import { EmployeeService } from '../home/employee.service';
import { MainComponent } from '../main/main.component';
import { HomeComponent } from '../home/home.component';

@NgModule({
  declarations: [
    AppComponent, EmployeeFilterPipe , MainComponent, HomeComponent],
  imports: [
    BrowserModule,FormsModule , RouterModule.forRoot([
      { path: 'main' , component : MainComponent },
      { path: '' , component : HomeComponent }
    ])
  ],
  providers: [ EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
