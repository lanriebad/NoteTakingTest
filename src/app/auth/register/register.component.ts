import { Component, OnInit } from '@angular/core';
import {FormGroup, UntypedFormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {encryptText} from "../../utils/encrypt";
import {Store} from "@ngrx/store";
import {AuthActions} from "../auth.actions";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  regForm!: FormGroup
  constructor(private fb: UntypedFormBuilder,
              private store: Store) { }

  ngOnInit(): void {
    this.regForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      name: [null, [Validators.required]],
      surname: [null, [Validators.required]],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  onRegister(): void {
    const userDetails = this.regForm.value
    this.store.dispatch(AuthActions.register({
      email: userDetails.email.trim(),
      name: userDetails.name.trim(),
      surname: userDetails.surname.trim(),
      username: userDetails.username.trim(),
      password: encryptText(userDetails.password)
    }));
  }

}
