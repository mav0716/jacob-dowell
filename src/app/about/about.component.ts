import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [HttpClientModule, ButtonModule, CardModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  //Variables
  bioContent: string = '';

  constructor(private http: HttpClient) {}


  //Initalize
  ngOnInit(){
    this.loadTextFile();  
  }

  loadTextFile(): void {
    this.http.get('assets/files/bio.txt', { responseType: 'text' })
      .subscribe({
        next: (data) => {
          this.bioContent = data;
        },
        error: (error) => {
          console.error('Failed to load text file:', error);
        }
      });
  }

  downloadPdf(): void {
    const link = document.createElement('a');
    link.href = 'assets/files/jacob-resume.pdf';
    link.download = 'JacobsResume.pdf';
    link.click();
  }
}