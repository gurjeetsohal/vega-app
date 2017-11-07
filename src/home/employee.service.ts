import { Injectable } from '@angular/core';

import { Employee } from './employee'


@Injectable()

export class EmployeeService{
     
    emp_obj_arr = [];

    getEmployees(){
        var emp_arr =  [{
            name : "Surjeet",
            username : "surjeet.singh"
        },
        {
            name : "Gurjeet",
            username : "gurjeet.singh"
        },
        {
            name : "Manjeet",
            username : "manjeet.singh"
        },
        {
            name : "Harjeet",
            username : "harjeet.singh"
        }]

        for(let arr of emp_arr){
             this.emp_obj_arr.push(new Employee(arr));
        }

        return this.emp_obj_arr;
    }
}