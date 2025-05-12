import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../services/search.service';
import { SidebarService } from '../services/sidebar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-user',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './nav-user.component.html',
  styleUrl: './nav-user.component.scss'
})
export class NavUserComponent {
  private searchService = inject(SearchService);
  private sidebarService = inject(SidebarService);
  searchTerm: string = '';
  showMobileSearch = false;

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchService.updateSearch(input.value);
    this.searchTerm = input.value;
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  toggleMobileSearch() {
    this.showMobileSearch = !this.showMobileSearch;
    if (!this.showMobileSearch) {
      this.searchTerm = '';
      this.searchService.updateSearch('');
    }
  }
}
