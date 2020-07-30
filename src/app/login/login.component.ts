import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../services/login.service';
import { Title } from '@angular/platform-browser';
import { first } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  isLoading = false;

  constructor(
    private router: Router,
    public LS: LoginService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public titleservice: Title,
    public AC: AppComponent
  ) {
    this.AC.isLoggedIn = false;
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.loginForm.value.password = '';
    this.titleservice.setTitle('Electronics');
  }

  ngOnInit(): void {}

  async onSubmit() {
    this.isLoading = true;
    this.submitted = true;
    if (this.loginForm.valid) {
      this.openSnackBar('Loading.. ', 'Login');
      await (await this.LS.loginUser(this.loginForm.value))
        .pipe(first())
        .subscribe(async (data) => {
          if( data.success === true) {
            this.AC.isLoggedIn = true;
            this.router.navigate(['/dashboard']);
          }
          else {
            this.openSnackBar(data.error, 'Login');
          }
        }, error => {
          
        });
    } else {
    }
  }

  logout() {
    localStorage.clear();
    this.AC.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
