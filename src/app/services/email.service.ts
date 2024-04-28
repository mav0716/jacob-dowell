import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'})
export class EmailService {
  constructor(private http: HttpClient) {}

  sendEmail(data: { subject: string, email: string, message: string }) {
    return this.http.post('https://oifktjww37.execute-api.us-east-2.amazonaws.com/prod/send-email', data);
  }
}