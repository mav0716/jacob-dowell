import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  bioParagraphs: string[] = [];

  constructor(private fileService: FileService) {}

  ngOnInit() {
    this.fileService.loadTextFile('assets/files/bio.txt').subscribe({
      next: data => {
        this.bioParagraphs = data
          .split(/\n\s*\n/)
          .map(paragraph => paragraph.trim())
          .filter(Boolean);
      },
      error: error => console.error('There was an error loading the file', error)
    });
  }
}
