import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  redirectUrl: string;
  baseUrl:string = "http://localhost:3000";
  public loggedusername : string;
  public emails : Array<string>;
  
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  constructor(private httpClient : HttpClient) { }


  public userlogin(email, password) {
    //alert(email)
    return this.httpClient.post<any>(this.baseUrl + '/api/getuser', { email, password })
            .pipe(map(User => {
                        this.loggedusername = User[0].firstname;
                        console.log(User[0].firstname);
                        console.log(User[0].email);
                        this.setToken(User[0].email);
                       // this.setusertype(User[0].firstname);
                        this.getLoggedInName.emit(true);
                        return User;
            }));
    }

    public userregistration(firstname,lastname,password,email,mobileno) {
      return this.httpClient.post<any>(this.baseUrl + '/api/addnewuser', {firstname,lastname,password,email,mobileno});
  }

  public getmeeting(_id){
    //alert(_id);
    return this.httpClient.post<any>(this.baseUrl + '/api/getmeeting', { _id })
            .pipe(map(Meeting => {
                        return Meeting;
            }));
  }

  public updatemeeting(_id,date,time,purpose,venue,users)
{
    var assignee :string = this.getToken();
    alert('meeting updated successfully!!');
    return this.httpClient.post<any>(this.baseUrl + '/api/updatemeeting/'+_id,{date,time,purpose,venue,users}); 
    }

  public addnewmeeting(date,time,purpose,venue,users){
    var organisedby : string = this.getToken();
    alert("meeting added sucessfully!!!");
    return this.httpClient.post<any>(this.baseUrl+'/api/addnewmeeting',{date,time,purpose,venue,organisedby,users});

  }

  public getallmeetings(){
    return this.httpClient.get<any>(this.baseUrl+'/api/getallmeetings');
  }

  public getallusers(){
   return this.httpClient.get<any>(this.baseUrl+'/api/getallusers');
  }

  // setusertype(firstname:string){
  //   var username : string [] = firstname.split("-");
  //   if(username.length>1)
  //   {
  //     localStorage.setItem('usertype', 'admin');
  //   }
  //   else{
  //     localStorage.setItem('usertype', 'user');
  //   }
  // }
  // getusertype()
  // {
  //   return localStorage.getItem('usertype');
  // }

  // deleteusertype()
  // {
  //   localStorage.removeItem('usertype');
  // }
  //token
setToken(token: string) {
  localStorage.setItem('token', token);
  }
  getToken() {
  return localStorage.getItem('token');
  }
  deleteToken() {
  localStorage.removeItem('token');
  }
  isLoggedIn() {
  const usertoken = this.getToken();
  if (usertoken != null) {
  return true
  }
  return false;
  }
}
