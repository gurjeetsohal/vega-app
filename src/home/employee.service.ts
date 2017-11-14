import { Injectable } from '@angular/core';
import { Http , Response} from '@angular/http';

import { Employee } from './employee';
import 'rxjs/add/operator/map' ;
import 'rxjs/add/operator/do' ;


@Injectable()

export class EmployeeService{
     
    emp_obj_arr = [];

    constructor(private http : Http){

    }

    getEmployeesInfo(){
     return this.http.get('http://localhost:3000/employees_info')
       .do(res => console.log("get employees info: "+res));
  
    }

    getEmployeesOnLeave(){
        return this.http.get('http://hitesh:3000/test_vega')
        .do(res => console.log("get employees leave: "+res));
    }
}