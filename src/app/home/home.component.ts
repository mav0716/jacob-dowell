import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

interface Highlight {
  title: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  shortBio =
    'Hands-on full-stack engineering lead with 7+ years at Charles Schwab, modernizing regulated financial platforms with a focus on velocity, risk management, and reliability.';

  focusAreas = [
    'Enterprise modernization and cloud transformation',
    'AI-assisted delivery, data-informed decisions, and measurable impact',
    'Leadership, mentorship, and strong cross-functional partnerships'
  ];

  highlights: Highlight[] = [
    {
      title: 'What I build',
      description: 'Scalable, compliant financial products powered by resilient APIs and cloud-native systems.'
    },
    {
      title: 'How I work',
      description: 'I lead from the front: align teams, remove blockers, and keep delivery calm and focused.'
    },
    {
      title: 'What you can expect',
      description: 'Clear communication, influential leadership, and dependable outcomes.'
    }
  ];
}
