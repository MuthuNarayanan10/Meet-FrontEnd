import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-viewusers',
  templateUrl: './viewusers.component.html',
  styleUrls: ['./viewusers.component.css']
})
export class ViewusersComponent implements OnInit {

  constructor(private dataService : ApiService) {
    
    this.getallusers();


  }

  getallusers(){
    this.dataService.getallusers().subscribe((data)=>{
      this.users = data;
    });
    
  }
  users : any = [];

  ngOnInit(): void {
  }

}
