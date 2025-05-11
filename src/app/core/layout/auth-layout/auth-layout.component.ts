import { Component } from '@angular/core';
import { NavAuthComponent } from '../../../shared/nav-auth/nav-auth.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  imports: [NavAuthComponent, RouterOutlet],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {

}
