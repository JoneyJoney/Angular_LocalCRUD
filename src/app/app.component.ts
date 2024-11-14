import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Employee } from './Model/Employee';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
      empname : new FormControl(this.employeeobj.empname,[Validators.required]),
      empemail : new FormControl(this.employeeobj.empemail,[Validators.required,Validators.email]),
      empmobile : new FormControl(this.employeeobj.empmobile,[Validators.required,Validators.minLength(10)]),
      emppassword : new FormControl(this.employeeobj.emppassword,[Validators.required]),
      empcity : new FormControl(this.employeeobj.empcity,[Validators.required]),
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
      this.employeeform.controls['empid'].setValue(1);
      this.employeeList.unshift(this.employeeform.value);
    }
    localStorage.setItem("empdata",JSON.stringify(this.employeeList));
    this.reset();
  }
  onEdit(item:Employee)
  {
    this.employeeobj = item;
    this.createform();
  }

  UpdateData()
  {
    const updaterecord = this.employeeList.find(x => x.empid == this.employeeform.controls['empid'].value)
    if(updaterecord != null)
    {
      updaterecord.empname = this.employeeform.controls['empname'].value;
      updaterecord.empemail = this.employeeform.controls['empemail'].value;
      updaterecord.empmobile = this.employeeform.controls['empmobile'].value;
      updaterecord.emppassword = this.employeeform.controls['emppassword'].value;
      updaterecord.empcity = this.employeeform.controls['empcity'].value;
      updaterecord.empstatus = this.employeeform.controls['empstatus'].value;

    }
    localStorage.setItem("empdata",JSON.stringify(this.employeeList));
    this.employeeobj = new Employee();
    this.createform();
    

  }

  onDelete(id:number)
  {
    const delmsg = confirm('Are You Sure Want to Delete?');
    if(delmsg)
    {
      const indexid = this.employeeList.findIndex(x=> x.empid == id);
      if(indexid != null)
      {
        this.employeeList.splice(indexid,1);
        localStorage.setItem("empdata",JSON.stringify(this.employeeList));
      }
    }
  }

  
}
