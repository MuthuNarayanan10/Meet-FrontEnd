import { Component, OnInit,Injectable, Pipe, PipeTransform } from '@angular/core';
import { ApiService } from '../api.service';
import {MeetingFilter} from '../MeetingFilter';



@Component({
  selector: 'app-todaymeetings',
  
  templateUrl: './todaymeetings.component.html',
  styleUrls: ['./todaymeetings.component.css']
})
export class TodaymeetingsComponent implements OnInit {

  constructor(private dataService : ApiService) {
    this.getallmeetings();

   }

  ngOnInit(): void {
  }

  getallmeetings(){
    var today = new Date();
    var yyyy = today.getFullYear();
    var mm = today.getMonth()+1;
    var dd = today.getDate();

    var todaydate:string = dd+"/"+mm+"/"+yyyy;

   // alert(dd+"/"+mm+"/"+yyyy);

    this.dataService.getallmeetings().subscribe((data)=>{
      this.Meetings = data;
      this.Meetings =  this.Meetings.filter(data =>  data.date === todaydate);
      
    });
    //this.Meetings =  this.Meetings.filter(data=>  data.date == todaydate);
    //this.Meetings.filter(meeting => meeting.date == '12/10/2020');
  }
  Meetings : any = [];
 

}
