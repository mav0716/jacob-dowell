import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesModule } from 'primeng/messages';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Message } from 'primeng/api';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    ReactiveFormsModule,
    MessagesModule,
    ProgressSpinnerModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  messages: Message[] = [];
  showSpinner = false;

  constructor(private formBuilder: FormBuilder, private emailService: EmailService) {}

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      subject: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (!this.contactForm.valid) {
      this.setMessages('warn', 'Missing details', 'Please fill out all fields before sending.');
      return;
    }

    this.showSpinner = true;
    this.emailService
      .sendEmail(this.contactForm.value)
      .pipe(finalize(() => (this.showSpinner = false)))
      .subscribe({
        next: response => {
          console.log('Email sent successfully!', response);
          this.setMessages('success', 'Success', 'Email sent successfully!');
          this.contactForm.reset();
        },
        error: error => {
          console.log('Error sending email', error);
          this.setMessages('error', 'Error', 'Failed to send email. Please try again.');
        }
      });
  }

  get email() {
    return this.contactForm.get('email');
  }

  private setMessages(severity: 'success' | 'error' | 'warn', summary: string, detail: string) {
    this.messages = [{ severity, summary, detail }];
    setTimeout(() => {
      this.messages = [];
    }, 15000);
  }
}
