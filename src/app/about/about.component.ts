// src/app/about/about.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClientCoreModule } from '../core/http-client.module';
import { FileService } from '../services/file.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    HttpClientCoreModule,
    ButtonModule,
    CardModule
  ],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  providers: [FileService]
})
export class AboutComponent implements OnInit {
  bioContent: string = '';

  constructor(private fileService: FileService) {}

  ngOnInit() {
    this.fileService.loadTextFile('assets/files/bio.txt').subscribe({
      next: data => this.bioContent = data,
      error: error => console.error('There was an error loading the file', error),
      complete: () => console.log('File loading complete')
    });
  }
}