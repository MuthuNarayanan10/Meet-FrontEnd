import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  angForm: FormGroup;
constructor(private fb: FormBuilder,private dataService: ApiService,private router:Router) {
this.angForm = this.fb.group({
firstname : ['', Validators.required],
lastname : ['', Validators.required],
email: ['', [Validators.required,Validators.minLength(1), Validators.email]],
password: ['', Validators.required],
//name: ['', Validators.required]
mobileno: ['', Validators.required]
});
}

postdata(angForm1)
{
  
  var firstname:string = angForm1.value.firstname;
  var lastname:string = angForm1.value.lastname;
  var password:string = angForm1.value.password;
  var email : string = angForm1.value.email;
  var mobileno : string = angForm1.value.mobileno;
  //alert(firstname);
  //alert(firstname+'-'+lastname+'-'+password+'-'+email+'-'+mobileno);

 //console.log("user registerd"+angForm1.firstname.value);
    alert("User Registration Success!!");
this.dataService.userregistration(firstname,lastname,password,email,mobileno)
.pipe(first())
.subscribe(
data => {
this.router.navigate(['/login']);
},

error => {
});
}

get email() { return this.angForm.get('email'); }
get password() { return this.angForm.get('password'); }
get name() { return this.angForm.get('name'); }

cancel()
  {
    this.router.navigate(["/login"]);
  }


  ngOnInit(): void {
  }

}
