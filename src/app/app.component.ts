import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { HttpClientCoreModule } from './core/http-client.module';
import { ButtonModule } from 'primeng/button';
import { FileService } from './services/file.service';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'], // Corrected from styleUrl to styleUrls
    imports: [RouterOutlet, RouterModule, TabMenuModule, HttpClientCoreModule, ButtonModule, TooltipModule, ToolbarModule ],
    providers: [FileService]
})
export class AppComponent implements AfterViewInit {
    @ViewChild('mainContent') mainContent?: ElementRef;
    @ViewChild('footer') footer?: ElementRef;
    title = 'Jacob Dowell';
    items?: MenuItem[];
    activeItem?: MenuItem;

    constructor(private fileService: FileService) {}

    ngAfterViewInit(): void {
        this.adjustContentPadding();
    }

    @HostListener('window:resize')
    onResize() {
        this.adjustContentPadding();
    }

    adjustContentPadding(): void {
        if (this.footer && this.mainContent) {
          const footerHeight = this.footer.nativeElement.offsetHeight;
          this.mainContent.nativeElement.style.paddingBottom = `${footerHeight}px`;
        }
    }

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

    viewPDF() {
        window.open('assets/files/jacob-resume.pdf', '_blank');
    }
}