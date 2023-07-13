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
  templateUrl: './element-emergency.component.html',
  styleUrls: ['./element-emergency.component.scss']
})

export default class ElementEmergencyComponent {

  emergencyForm: FormGroup;
  submitted = false;
  errorMessage = '';
  successMessage = '';
  sessionId = '';
  currentLocation: string = '';
  callerName: string;

  constructor(private cookieService: CookieService,private formBuilder: FormBuilder, private http: HttpClient) {
    this.emergencyForm = this.formBuilder.group({
      callerName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      emergencyType: ['', Validators.required],
      location: ['', Validators.required]
      // Add other properties related to the emergency form
    });
  }
  ngOnInit() {
    console.log('on emergency page');
    const userData = this.cookieService.get('user');
    if (userData) {
      // Cookie data exists
      const user = JSON.parse(userData);
      this.sessionId = user._id;
      console.log(user);
      this.callerName = user.name;
      this.emergencyForm.patchValue({
        callerName: this.callerName
      });
      // Perform further actions with the user data
    } else {
      // Cookie data does not exist
      // Handle the absence of cookie data
    }
  }

  onSubmit() {
    this.submitted = true;
    console.log('hitting submit function');
    this.errorMessage = ''; // Variable to hold the error message
    this.successMessage = ''; // Variable to hold the success message

    if (this.emergencyForm.valid) {
      const emergencyData = this.emergencyForm.value;
      console.log(emergencyData);
      const user_id = this.sessionId;
      // Check if the emergency exists before creating
      this.http.post(`http://localhost:8082/emergencies/create/?userId=${this.sessionId}`, emergencyData).subscribe(
        (createResponse) => {
          // Handle the success response from the API


          // Perform any necessary actions after successfully creating the emergency
          if (createResponse) {
            // Additional condition based on the createResponse
            // Perform specific actions or navigate to another page
            console.log(createResponse);
            this.successMessage = 'Emergency created successfully'; // Set the success message
            this.errorMessage = ''; // Reset the error message
          }
        },
        (createError) => {
          // Handle the error response from creating the emergency
          console.error(createError);
          this.errorMessage = 'Failed to create emergency'; // Set the error message
          this.successMessage = ''; // Reset the success message
          // Perform any necessary error handling
        }
      );
    }
  }



  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        this.getAddressFromCoordinates(lat, lng).then((address) => {
          this.emergencyForm.get('location').setValue(address);
        });
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  getAddressFromCoordinates(lat: number, lng: number): Promise<string> {
    const accessToken = 'pk.eyJ1IjoiaGVsbG9heXNoYTE3OCIsImEiOiJjbGl2aDA2eTAyNnMwM2VvY3VtOXBrM2J6In0.Mfd-a-4TCtkz7BOpXrrHOA';
    const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${accessToken}`;

    return new Promise((resolve, reject) => {
      this.http.get(geocodingUrl).subscribe(
        (response: any) => {
          const features = response.features;
          if (features && features.length > 0) {
            const address = features[0].place_name;
            resolve(address);
          } else {
            reject('No address found for the provided coordinates.');
          }
        },
        (error) => {
          reject('Error occurred while fetching the address.');
        }
      );
    });
  }

}
