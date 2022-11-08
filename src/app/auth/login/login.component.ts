import { Component, OnInit } from '@angular/core';
import {FormGroup, UntypedFormBuilder, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AuthActions} from "../auth.actions";
import {encryptText} from "../../utils/encrypt";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: UntypedFormBuilder,
              private store: Store) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, Validators.required]
    });
  }

  onLogin(): void {
    const loginForm = this.loginForm.value;
    this.store.dispatch(
      AuthActions.login({
        username: loginForm.username.trim(),
        password: encryptText(loginForm.password)
      }));
  }
}
