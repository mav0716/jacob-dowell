import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, RouterModule, TabMenuModule]
})
export class AppComponent {
  title = 'Jacob Dowell';
  tempTitle = 'Under Construction';

  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;

  ngOnInit() {
      this.items = [
          { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/home'] },
          { label: 'About', icon: 'pi pi-fw pi-user', routerLink: ['/about'] },
          { label: 'Settings', icon: 'pi pi-fw pi-cog', routerLink: ['/setting'] }
      ];

      this.activeItem = this.items[0];
  }
}
