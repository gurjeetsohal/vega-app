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
        // var emp_arr =  [{
        //     name : "Surjeet",
        //     username : "surjeet.singh"
        // },
        // {
        //     name : "Gurjeet",
        //     username : "gurjeet.singh"
        // },
        // {
        //     name : "Manjeet",
        //     username : "manjeet.singh"
        // },
        // {
        //     name : "Harjeet",
        //     username : "harjeet.singh"
        // }]

        // for(let arr of emp_arr){
        //      this.emp_obj_arr.push(new Employee(arr));
        // }
        return this.http.get('http://hitesh:3000/test_vega')
        .do(res => console.log(res));
        //.do(res => console.log("my response type: "+typeof JSON.parse(res));
  
    }
}