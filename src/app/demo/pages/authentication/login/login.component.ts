import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
// impoert cookie service
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent {

  loginForm: FormGroup;
  submitted = false;
  errorMessage   = '';
  successMessage = ''

  constructor(private formBuilder: FormBuilder , private http: HttpClient,private router: Router, private cookieService: CookieService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  onSubmit() {
    this.submitted = true;
    console.log('hitting submit function');
    this.errorMessage = ''; // Variable to hold the error message
    this.successMessage = ''; // Variable to hold the success message

    if (this.loginForm.valid) {
      const userData = this.loginForm.value;
      console.log(userData);

      // Check if the email exists before creating the user
      this.http.get(`http://localhost:8081/users/match/?email=${userData.email}&password=${userData.password}`).subscribe(
        (response) => {
          // Handle the response from the API
          if (response !== null && Object.keys(response).length !== 0) {
            console.log('Successfully logged in');
            // Store session in cache
            // this.sessionStorageService.store('user', response);

            // Save user data as a cookie
            this.cookieService.set('user', JSON.stringify(response));

            // Redirect to a new page (example: dashboard)
            this.router.navigate(['/default']);
          } else {
            // Email does not exist, proceed with creating the user
            console.log('Fail to log in');
            this.errorMessage = 'Invalid Email or password'; // Set the error message
            this.successMessage = ''; // Reset the success message
          }
        },
        (error) => {
          // Handle the error response from the API
          console.error(error);
          this.errorMessage = 'Invalid Email or password'; // Set the error message
          this.successMessage = ''; // Reset the success message
          // Perform any necessary error handling
        }
      );
    }
  }


}
