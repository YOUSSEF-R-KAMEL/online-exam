import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  private sidebarService = inject(SidebarService);
  private router = inject(Router);
  private subscription: Subscription = new Subscription();
  isOpen = true;

  ngOnInit() {
    this.subscription = this.sidebarService.sidebarState$.subscribe(
      state => this.isOpen = state
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  async logout(): Promise<void> {
    try {
      // Clear token
      localStorage.removeItem('token');
      // Navigate to root path
      await this.router.navigate(['/']);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}
