import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  
loginForm:any= FormGroup;
submitted= false;
submitMsg =false;

  constructor(private fb: FormBuilder,private _loginService:LoginService) {
    this.loginForm = this.fb.group({
       userName:['',[Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
       password:['',[Validators.required,Validators.maxLength(20),Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]]

    })
    
   }

   get userName(){
    return this.loginForm.get('userName')
  }

  get password(){
    return this.loginForm.get('password')
  }
  
  login(){
    this.submitted=true;
    this.submitMsg=true;
    console.log(this.loginForm.value);
    this._loginService.loginData(this.loginForm.value)
     
    .subscribe(
      response => console.log('Succsess',response),
      error => console.error('Error!',error)
    )
    
  }

  ngOnInit(): void {
  }

}
