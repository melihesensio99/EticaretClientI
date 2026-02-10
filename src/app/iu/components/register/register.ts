import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from '../../../entities/User';
import { UserService } from '../../../services/common/models/user-service';
import { createUser } from '../../../contracts/User/create-user';
import { CustomToastr, ToastrPosition, ToastTrMessageType } from '../../../services/iu/custom-toastr';
import { messageType } from '../../../services/admin/alertify';
import { NgxSpinnerService } from 'ngx-spinner';
import { spinnerType } from '../../../base/base';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder , private userService : UserService , private toastr : CustomToastr , private spinner : NgxSpinnerService , private router : Router ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      nameSurname: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      username: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      email: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.email
      ]],
      password: ["", [
        Validators.required,
        Validators.minLength(6)
      ]],
      passwordConfirm: ["", [
        Validators.required,
         Validators.minLength(6)
      ]]
    }, 
    {validators: (group:AbstractControl):ValidationErrors | null => {
      let sifre = group.get("password").value;
      let sifreTekrar = group.get("passwordConfirm").value;
      return sifre === sifreTekrar ? null : {notSame: true}; 
    }}
    );
  }
  get component(){
    return this.registerForm.controls;
  }

  submitted:boolean = false;
  async onSubmit(user : User) {
    this.submitted = true;
    if(this.registerForm.invalid)
      return ;

const result : createUser = await this.userService.createUser(user);


if(result.succeeded){
  this.toastr.message(result.message, "kullanici oluşturuldu" , {
  messageType : ToastTrMessageType.Success,
   positionType :ToastrPosition.TopRight
  })
  
this.router.navigate(["/login"]);
}

 else
    this.toastr.message(result.message, "Hata", {
          messageType: ToastTrMessageType.Error,
          positionType: ToastrPosition.TopRight
        });
      }
  
      
 }
