import { Pipe , PipeTransform} from '@angular/core' ;

@Pipe({
     name:'employeeFilter'
})

export class EmployeeFilterPipe implements PipeTransform{
    
    transform(value,filterBy:string){
      filterBy=filterBy?filterBy.toLocaleLowerCase():null ;
      return filterBy?value.filter( (employee)=>employee.name.toLocaleLowerCase().indexOf(filterBy)>-1):value;
    }   
 }
