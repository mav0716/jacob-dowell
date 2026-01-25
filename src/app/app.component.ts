import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FileService } from './services/file.service';
import { filter } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, RouterModule, TabMenuModule, ButtonModule ],
})
export class AppComponent implements OnInit {
    constructor(private fileService: FileService, private router: Router) {}

    title = 'Jacob Dowell';
    items: MenuItem[] = [];
    activeItem: MenuItem | undefined;

    ngOnInit() {
        this.items = [
            { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: '/home' },
            { label: 'About', icon: 'pi pi-fw pi-user', routerLink: '/about' },
            { label: 'Contact', icon: 'pi pi-fw pi-envelope', routerLink: '/contact' }
        ];

        this.setActiveItem(this.router.url);

        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(event => {
                const navigation = event as NavigationEnd;
                this.setActiveItem(navigation.urlAfterRedirects);
            });
    }
    
    downloadPdf(): void {
        this.fileService.downloadPdf();
    }

    viewPDF(){
        window.open('assets/files/jacob-resume.pdf', '_blank');
    }

    navigateToLinkedIn() {
        window.open('https://www.linkedin.com/in/jacob-dowell/', '_blank');
    }

    private setActiveItem(url: string): void {
        const normalizedUrl = url.split('?')[0].split('#')[0];
        const match = this.items.find(item => {
            if (typeof item.routerLink === 'string') {
                return normalizedUrl.startsWith(item.routerLink);
            }
            if (Array.isArray(item.routerLink)) {
                return normalizedUrl.startsWith(item.routerLink.join('/'));
            }
            return false;
        });

        this.activeItem = match ?? this.items[0];
    }
}
