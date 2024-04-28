import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { HttpClientCoreModule } from './core/http-client.module';
import { ButtonModule } from 'primeng/button';
import { FileService } from './services/file.service';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, RouterModule, TabMenuModule, HttpClientCoreModule, ButtonModule, TooltipModule, ToolbarModule ],
    providers: [FileService]
})
export class AppComponent implements AfterViewInit {
    @ViewChild('mainContent') mainContent?: ElementRef<HTMLDivElement>;
    @ViewChild('footer') footer?: ElementRef<HTMLDivElement>;
    downloadLabel: string = '';
    viewLabel: string = '';
    title = 'Jacob Dowell';
    tempTitle = 'Under Construction';
    items: MenuItem[] | undefined;
    activeItem: MenuItem | undefined;

    constructor(private fileService: FileService) {}
      
    ngAfterViewInit() {
        this.adjustContentPadding();
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', () => this.adjustContentPadding());
        }
    }
        
      adjustContentPadding() {
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

    viewPDF(){
        window.open('assets/files/jacob-resume.pdf', '_blank');
    }
}
