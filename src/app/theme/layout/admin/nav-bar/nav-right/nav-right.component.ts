// Angular import
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent {

  userName = '';
  userRole = '';
  ngOnInit() {
    console.log('on color page');
    const userData = this.cookieService.get('user');
    if (userData) {
      // Cookie data exists
      const user = JSON.parse(userData);
      this.userName = user.name;
      this.userRole = user.role;
      console.log(user);
      // Perform further actions with the user data
    } else {
      // Cookie data does not exist
      // Handle the absence of cookie data
    }
  }

  constructor(private cookieService: CookieService, private router: Router) {}

  logout(): void {
    // Remove the cookie session
    this.cookieService.delete('user');
    // Redirect to the login page
    this.router.navigate(['/guest/register']);
    // Redirect to the desired route using window.location.href
    //window.location.href = '/guest/login';
  }
}