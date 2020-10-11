import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormArray, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import {tbl_user} from '../models/usermodel';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-addmeeting',
  templateUrl: './addmeeting.component.html',
  styleUrls: ['./addmeeting.component.css']
})
export class AddmeetingComponent implements OnInit {
  public angForm: FormGroup;
  public month: number = new Date().getMonth();
  public day : number = new Date().getDate();
    public fullYear: number = new Date().getFullYear();
  public dateValue: Date = new Date(this.fullYear, this.fullYear , this.day);
    //public minDate: Date = new Date(this.fullYear, this.month , 1);
   // public maxDate: Date = new Date(this.fullYear, this.month, 31);

  constructor(private fb: FormBuilder,private dataService: ApiService,private router:Router) {
    this.angForm = this.fb.group({
      
      users: ['', Validators.required],
      meetingdate: ['', Validators.required],
      meetingtime: ['', Validators.required],
      venue: ['', Validators.required],
      purpose : ['',Validators.required],
      checkArray: this.fb.array([])
      });
   }
   public users : tbl_user[];
  ngOnInit(): void {
    // this.dataService.getuserslist().subscribe(res => this.emails = res);
      this.dataService.getallusers().subscribe(res => this.users = res);
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.angForm.get('checkArray') as FormArray;
    //alert('checkbox fired');

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }

    //alert(checkArray.value);
  }

  postdata(angForm1)
  {
    const checkArray: FormArray = this.angForm.get('checkArray') as FormArray;
    //alert(angForm.date.value);
   // alert(checkArray.value);
   // alert(angForm1.value.meetingdate);
   // alert(angForm1.value.meetingtime);
   // alert(angForm1.value.venue);
   // alert(angForm1.value.purpose);
   // alert(this.dateValue.);

   
   var date = new  Date (angForm1.value.meetingdate);
   var meetingdate = date.getDate() +"/"+ (date.getMonth()+1)+"/"+date.getFullYear();
   var users:string = checkArray.value;
  
  //  alert(angForm1.value.meetingtime);
   var time:string = angForm1.value.meetingtime;
   var hours:string[] = time.split(":");
   var hour:Number ;
   var min:Number;
   var meridian:string;

  //  alert(hours[0]);
  //  alert(hours[1]);
    min = Number(hours[1]);
   if (Number(hours[0]) > 12)
   {
     meridian = "PM";
     hour = Number(hours[0])-12;
     
   }else if(Number(hours[0]) < 12)
   {
      meridian = 'AM';
      hour = Number(hours[0]);
      if(hour == 0){
        hour = 12;
      }
   } else{
    meridian = 'PM';
   }
   var meetingtime:string = hour + ':' + hours[1] + ':' + meridian;
  //   alert(meetingdate);
  //  alert(meetingtime);
  // alert(angForm1.value.purpose);
  // alert(angForm1.value.venue);
   alert(users);
  //  //alert(month);

    this.dataService.addnewmeeting(meetingdate,meetingtime,angForm1.value.purpose,angForm1.value.venue,users)
    .pipe(first()).subscribe(data => {this.router.navigate(['/viewusers'])}, error => {} );
  }

}


