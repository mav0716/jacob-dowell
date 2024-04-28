import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { HttpClientCoreModule } from './core/http-client.module';
import { ButtonModule } from 'primeng/button';
import { FileService } from './services/file.service';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, RouterModule, TabMenuModule, HttpClientCoreModule, ButtonModule, TooltipModule ],
    providers: [FileService]
})
export class AppComponent implements OnInit {
    constructor(private fileService: FileService) {}
    title = 'Jacob Dowell';
    items: MenuItem[] | undefined;
    activeItem: MenuItem | undefined;

    ngOnInit() {
        this.items = [
            { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/home'] },
            { label: 'About', icon: 'pi pi-fw pi-user', routerLink: ['/about'] },
            { label: 'Contact', icon: 'pi pi-fw pi-envelope', routerLink: ['/contact'] }
        ];

        this.activeItem = this.items[0];
    }
    
    downloadPdf(): void {
        this.fileService.downloadPdf();
    }

    viewPDF(){
        window.open('assets/files/jacob-resume.pdf', '_blank');
    }

    navigateToLinkedIn() {
        window.open('https://www.linkedin.com/in/jacob-dowell/', '_blank');    }
}
