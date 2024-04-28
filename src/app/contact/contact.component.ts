import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Make sure CommonModule is imported
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ReactiveFormsModule } from '@angular/forms'; 
import { EmailService } from '../services/email.service';


@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, InputTextModule, ButtonModule, CardModule, ReactiveFormsModule],
  providers: [EmailService],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private emailService: EmailService) {}

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      subject: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.emailService.sendEmail(this.contactForm.value).subscribe({
        next: response => console.log('Email sent successfully!', response),
        error: error => console.log('Error sending email', error)
      });
    }  
  }

  get email() {
    return this.contactForm.get('email');
  }
}
