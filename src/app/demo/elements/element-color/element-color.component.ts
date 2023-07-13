import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-element-color',
  standalone: true,
  imports: [CommonModule ,RouterModule,ReactiveFormsModule],
  templateUrl: './element-color.component.html',
  styleUrls: ['./element-color.component.scss']
})

export default class ElementColorComponent {

  vehicleForm: FormGroup;
  submitted = false;
  errorMessage = '';
  successMessage = '';
  sessionId = '';

  constructor(private cookieService: CookieService,private formBuilder: FormBuilder, private http: HttpClient) {
    this.vehicleForm = this.formBuilder.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required]
      // Add other properties related to the vehicle form
    });
  }
  ngOnInit() {
    console.log('on color page');
    const userData = this.cookieService.get('user');
    if (userData) {
      // Cookie data exists
      const user = JSON.parse(userData);
      this.sessionId = user._id;
      console.log(user);
      // Perform further actions with the user data
    } else {
      // Cookie data does not exist
      // Handle the absence of cookie data
    }
  }


onSubmit() {
  const url = 'http://localhost:8081/vehicles/create'; // Update the URL to your Express.js API endpoint
  this.submitted = true;
  console.log('hitting submit function');
  this.errorMessage = ''; // Variable to hold the error message
  this.successMessage = ''; // Variable to hold the success message

  if (this.vehicleForm.valid) {
    const vehicleData = this.vehicleForm.value;
    console.log(vehicleData);

    // Check if the vehicle exists before creating
    this.http.get(`http://localhost:8081/vehicles/create/?make=${vehicleData.make}&model=${vehicleData.model}&year=${vehicleData.year}`).subscribe(
      (response) => {
        // Handle the response from the API
        if (response !== null && Object.keys(response).length !== 0) {
          console.log('Vehicle already exists');
          this.errorMessage = 'Vehicle already exists'; // Set the error message
          this.successMessage = ''; // Reset the success message
        } else {
          // Vehicle does not exist, proceed with creating
          this.http.post('http://localhost:8081/vehicles/create', vehicleData).subscribe(
            (createResponse) => {
              // Handle the success response from the API
              console.log(createResponse);
              this.successMessage = 'Vehicle created successfully'; // Set the success message
              this.errorMessage = ''; // Reset the error message

              // Perform any necessary actions after successfully creating the vehicle
              if (createResponse) {
                // Additional condition based on the createResponse
                // Perform specific actions or navigate to another page
              }
            },
            (createError) => {
              // Handle the error response from creating the vehicle
              console.error(createError);
              this.errorMessage = 'Failed to create vehicle'; // Set the error message
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
