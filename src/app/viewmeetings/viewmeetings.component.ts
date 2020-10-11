import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-viewmeetings',
  templateUrl: './viewmeetings.component.html',
  styleUrls: ['./viewmeetings.component.css']
})
export class ViewmeetingsComponent implements OnInit {

  adminuser:boolean;

  constructor(private dataService : ApiService) {
    
    this.getallmeetings();
    //this.adminuser = this.dataService.loggedusername.includes("admin");
    //alert(this.dataService.loggedusername.includes("admin"));
    this.adminuser = (this.dataService.loggedusername.includes("admin"));
  }

  getallmeetings(){
    this.dataService.getallmeetings().subscribe((data)=>{
      this.Meetings = data;
    });
    
  }
  Meetings : any = [];

  ngOnInit(): void {
  }
}
