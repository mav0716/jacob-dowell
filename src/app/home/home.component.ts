import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { FileService } from '../services/file.service';
import { HttpClientCoreModule } from '../core/http-client.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardModule, ButtonModule, PanelModule, HttpClientCoreModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [FileService]
})
export class HomeComponent implements OnInit {
  shortBio: any;

  constructor(private fileService : FileService) {}

  ngOnInit(): void {
    this.shortBio = "I am a seasoned software engineer with six years of professional experience, specializing in developing robust web applications."
  }
}
