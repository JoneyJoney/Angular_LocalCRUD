import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Employee } from './Model/Employee';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  employeeobj : Employee = new Employee();
  employeeform : FormGroup = new FormGroup({});
  employeeList : Employee[] = [];


constructor()
{
  this.createform();

  const myempdata = localStorage.getItem("empdata");
  if(myempdata != null)
  {
    const empdata = JSON.parse(myempdata);
    this.employeeList = empdata;
  }
}

  createform()
  {
    this.employeeform = new FormGroup({
      empid : new FormControl(this.employeeobj.empid),
      empname : new FormControl(this.employeeobj.empname),
      empemail : new FormControl(this.employeeobj.empemail),
      empmobile : new FormControl(this.employeeobj.empmobile),
      emppassword : new FormControl(this.employeeobj.emppassword),
      empcity : new FormControl(this.employeeobj.empcity),
      empstatus : new FormControl(this.employeeobj.empstatus)
    })
  }

  reset()
  {
    this.employeeobj = new Employee();
    this.createform();
  }


  SaveData()
  {
    const empolddata = localStorage.getItem("empdata");
    if(empolddata!= null)
    {
      const parseData = JSON.parse(empolddata);
      this.employeeform.controls['empid'].setValue(parseData.length + 1);
      this.employeeList.unshift(this.employeeform.value);
    }
    else{
      this.employeeList.unshift(this.employeeform.value);
    }
    localStorage.setItem("empdata",JSON.stringify(this.employeeList));
    this.reset();
  }

  
}
