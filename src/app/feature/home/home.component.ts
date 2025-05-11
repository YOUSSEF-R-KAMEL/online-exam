import { Component } from '@angular/core';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { NavUserComponent } from '../../shared/nav-user/nav-user.component';
@Component({
  selector: 'app-home',
  imports: [SidebarComponent, RouterOutlet, NavUserComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
