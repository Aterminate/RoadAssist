import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export default class RegisterComponent {
  signupForm: FormGroup;
  submitted = false;
  errorMessage   = '';
  successMessage = ''


  constructor(private formBuilder: FormBuilder , private http: HttpClient) {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  onSubmit() {
    const url = 'http://localhost:8081/users/create'; // Update the URL to your Express.js API endpoint
    this.submitted = true;
    console.log('hitting submit function');
    this.errorMessage = ''; // Variable to hold the error message
    this.successMessage = ''; // Variable to hold the success message

    if (this.signupForm.valid) {
      const userData = this.signupForm.value;
      console.log(userData);
      const signupData = { ...this.signupForm.value };
      signupData.role = 'Driver';
      signupData.address = 'Address';
      signupData.driver_id = '102';

      // Check if the email exists before creating the user
      this.http.get(`http://localhost:8081/users/current/?email=${signupData.email}`).subscribe(
        (response) => {
          // Handle the response from the API
          if (response !== null && Object.keys(response).length !== 0) {
            console.log('Email already exists');
            this.errorMessage = 'Email already exists'; // Set the error message
            this.successMessage = ''; // Reset the success message
          } else {
            // Email does not exist, proceed with creating the user
            this.http.post('http://localhost:8081/users/create', signupData).subscribe(
              (createResponse) => {
                // Handle the success response from the API
                console.log(createResponse);
                this.successMessage = 'User created successfully'; // Set the success message
                this.errorMessage = ''; // Reset the error message

                // Perform any necessary actions after successfully creating the user
                if (createResponse) {
                  // Additional condition based on the createResponse
                  // Perform specific actions or navigate to another page
                }
              },
              (createError) => {
                // Handle the error response from creating the user
                console.error(createError);
                this.errorMessage = 'Failed to create user'; // Set the error message
                this.successMessage = ''; // Reset the success message
                // Perform any necessary error handling
              }
            );
          }
        },
        (error) => {
          // Handle the error response from the API
          console.error(error);
          // Perform any necessary error handling
        }
      );
    }
  }



}
