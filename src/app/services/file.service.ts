import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  loadTextFile(filePath: string): Observable<string> {
    return this.http.get(filePath, { responseType: 'text' });
  }

  downloadPdf(): void {
    const link = document.createElement('a');
    link.href = 'assets/files/jacob-resume.pdf';
    link.download = 'JacobsResume.pdf';
    link.click();
  }
}