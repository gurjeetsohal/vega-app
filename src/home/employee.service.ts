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

    getEmployees(){
    
        return this.http.get('http://hitesh:3000/test_vega')
        .do(res => console.log(res));
  
    }
}