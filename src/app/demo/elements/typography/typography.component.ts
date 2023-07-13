import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-typography',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.scss']
})
export default class TypographyComponent {
  emergencies: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchEmergencies();
  }

  fetchEmergencies(): void {
    const apiUrl = 'http://localhost:8082/emergencies/all';

    this.http.get(apiUrl).subscribe(
      (response: any[]) => {
        this.emergencies = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
