import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  error = '';

  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/todo-list']);
    }
  }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  submit() {
    const loginData: Iuser = this.form.value;
    this.authService.login(loginData).subscribe(res => {
      this.router.navigate(['/todo-list']);
    }, () => {
      this.error = 'The username or password is incorrect';
    });
  }
}
