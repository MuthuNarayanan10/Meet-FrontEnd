import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {tbl_user} from '../models/usermodel';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import { FormGroup, FormControl,FormArray, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-editmeeting',
  templateUrl: './editmeeting.component.html',
  styleUrls: ['./editmeeting.component.css']
})
export class EditmeetingComponent implements OnInit {
  public editForm: FormGroup;
  
  _id : string;
  constructor(private fb: FormBuilder,private route: ActivatedRoute,private dataService: ApiService,private router:Router) {



    this._id=this.route.snapshot.paramMap.get("id");
    alert(this._id);
   this.getMeeting(this._id);


    this.editForm = this.fb.group({
      
      users: ['', Validators.required],
      meetingdate: ['', Validators.required],
      meetingtime: ['', Validators.required],
      venue: ['', Validators.required],
      purpose : ['',Validators.required],
      checkArray: this.fb.array([])
      });
   }
   public users : tbl_user[];
   public emails : String[];
   public dateValue :String;
   public timeValue :String;
   time: string;

  ngOnInit(): void {
    //alert('init');
    const checkArray: FormArray = this.editForm.get('checkArray') as FormArray;

    this.dataService.getallusers().subscribe(res =>{ 
      this.users = res;
      for(let i in this.users)
      {
       // alert(this.emails.includes(this.users[i].email));
       if(this.emails.includes(this.users[i].email))
       {
         this.users[i].checked = "Y";
         checkArray.push(new FormControl(this.users[i].email));
       }
       else {
         this.users[i].checked = "N";
       }
       //alert(this.users[i].firstname);
      }
    
    });
    
  //   for(let i=0; i<this.users.length; i++){
  //     //console.log(this.users[i].firstname); //use i instead of 0
  //     alert(this.users[i].firstname);
  // }

  }
  setUsers(users){
    this.emails = users.split(',');
  

  }
  getMeeting(id){
    this.dataService.getmeeting(id).subscribe(data =>{

     var mdate:string = data[0].date;
     var mdates:string[] = mdate.split('/');
     var yyyy = mdates[2];
     var mm = mdates[1];
     var dd = mdates[0];
    //var value = new Date(1999, 0, 1, 13, 30, 0)

     this.dateValue = yyyy+"-"+mm+"-"+dd;

     var mtime:String[] = data[0].time.split(':');

     let now = new Date();
     let hours ;
     if(mtime[2] == "PM")
     {
      hours = (Number(mtime[0])+12).toString();
     }
     else
     {
      hours = mtime[0];
     }
     
     let minutes = mtime[1];

     let str = hours + ':' + minutes;
     this.time = str;
    
 
      this.editForm.get('venue').setValue(data[0].venue);
      this.editForm.get('purpose').setValue(data[0].purpose);

      this.setUsers(data[0].users);
      
    });
    
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.editForm.get('checkArray') as FormArray;
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

   // alert(checkArray.value);
  }


  postdata(editForm)
  {
    const checkArray: FormArray = this.editForm.get('checkArray') as FormArray;
    //alert(angForm.date.value);
   // alert(checkArray.value);
   // alert(angForm1.value.meetingdate);
   // alert(angForm1.value.meetingtime);
   // alert(angForm1.value.venue);
   // alert(angForm1.value.purpose);
   // alert(this.dateValue.);

   
   var date = new  Date (editForm.value.meetingdate);
   var meetingdate = date.getDate() +"/"+ (date.getMonth()+1)+"/"+date.getFullYear();
   var users:string = checkArray.value;
  
  //  alert(angForm1.value.meetingtime);
   var time:string = editForm.value.meetingtime;
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
  //  alert(meetingdate);
  //  alert(meetingtime);
  //  alert(users);
  //  alert(editForm.value.purpose);
  // alert(editForm.value.venue);
  
  this.dataService.updatemeeting(this._id,meetingdate,meetingtime,editForm.value.purpose,editForm.value.venue,users)
     .pipe().subscribe(data => {this.router.navigate(['/viewmeetings'])}, error => {})

  }

}
