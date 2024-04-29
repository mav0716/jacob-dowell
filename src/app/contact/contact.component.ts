import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ReactiveFormsModule } from '@angular/forms'; 
import { EmailService } from '../services/email.service';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, InputTextModule, ButtonModule, CardModule, ReactiveFormsModule, MessagesModule, ProgressSpinnerModule],
  providers: [EmailService],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  messages: Message[] = [];
  showSpinner: boolean = false;

  constructor(private formBuilder: FormBuilder, private emailService: EmailService) {}

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      subject: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    this.showSpinner = true;
    if (this.contactForm.valid) {
      this.emailService.sendEmail(this.contactForm.value).subscribe({
        next: response => {
          console.log('Email sent successfully!', response);
          this.messages = [{ severity: 'success', summary: 'Success', detail: 'Email sent successfully!' }];
          setTimeout(() => {
            this.messages = []; 
          }, 15000); 
          this.contactForm.reset();
          this.showSpinner = false;
        },
        error: error => {
          console.log('Error sending email', error);
          this.messages = [{ severity: 'error', summary: 'Error', detail: 'Failed to send email. Please try again.' }];
          setTimeout(() => {
            this.messages = []; 
          }, 15000); 
          this.showSpinner = false;
        }
      });
    }  
  }

  get email() {
    return this.contactForm.get('email');
  }
}
