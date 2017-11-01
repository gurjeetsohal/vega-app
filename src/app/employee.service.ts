import { Injectable } from '@angular/core';

import { Employee } from './employee'


@Injectable()

export class EmployeeService{
     
    emp_obj_arr = [];

    getEmployees(){
        var emp_arr =  [{
            name : "surjeet",
            username : "surjeet.singh"
        },
        {
            name : "gurjeet",
            username : "gurjeet.singh"
        },
        {
            name : "manjeet",
            username : "manjeet.singh"
        },
        {
            name : "harjeet",
            username : "harjeet.singh"
        }]

        for(let arr of emp_arr){
             this.emp_obj_arr.push(new Employee(arr));
        }

        return this.emp_obj_arr;
    }

}