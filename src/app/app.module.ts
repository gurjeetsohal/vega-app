import { BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }from "@angular/forms"

import { AppComponent } from './app.component';
import { EmployeeFilterPipe } from './employee-filter.pipe';
import { EmployeeService } from './employee.service';


@NgModule({
  declarations: [
    AppComponent, EmployeeFilterPipe ],
  imports: [
    BrowserModule,FormsModule
  ],
  providers: [ EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
