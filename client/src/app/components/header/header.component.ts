import { Component, HostListener, OnInit, ViewChild, ElementRef } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('mobileMenu') mobileMenu: ElementRef | undefined;
  @ViewChild('mobileSearch') mobileSearch: ElementRef | undefined;
  isLoggedIn = false;
  showMobileMenu = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  faBars = faBars;
  faTimes = faTimes;

  ngOnInit(): void {

    // Track changes in route

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.closeMobileMenu();
      }
    });

  }

  logout(): void {
    const confirmed = confirm('Are you sure you want to logout?');

    if (!confirmed) {
      return;
    }

    this.authService.logout();
  }

  toggleMobileMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
  }

  closeMobileMenu(): void {
    this.showMobileMenu = false;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: any): void {
    if (!this.mobileMenu?.nativeElement.contains(event.target) && !this.mobileSearch?.nativeElement.contains(event.target)) {
      this.closeMobileMenu();
    }


  }

}
