import { Component, HostListener, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="layout">
      <nav class="sidebar" [class.closed]="isClosed">
        <h2 class="logo">
          SecureVault
          <span class="close-btn" (click)="toggleSidebar()">❮</span>
        </h2>
        <ul>
          <li><a routerLink="/dashboard" routerLinkActive="active">Dashboard</a></li>
          <li><a routerLink="/upload" routerLinkActive="active">Upload</a></li>
          <li><a routerLink="/mywallet" routerLinkActive="active">My Wallet</a></li>
          <!-- <li><a routerLink="/sensitivity" routerLinkActive="active">Share</a></li> -->
          <li><a routerLink="/receivedfiles" routerLinkActive="active">Received Files</a></li>
          <li><a routerLink="/sharedfiles" routerLinkActive="active">Shared Files</a></li>

         
          <li><a routerLink="/history" routerLinkActive="active">History</a></li>
          <li><a routerLink="/settings" routerLinkActive="active">Settings</a></li>
        </ul>

        <!-- <button class="logout-btn" (click)="logout()">Logout</button> -->
      </nav>

      <button class="hamburger" *ngIf="isClosed" (click)="toggleSidebar()">
  <span>☰</span>
</button>

    </div>
  `,
  styles: [`
    .layout {
      display: flex;
      height: 100vh;
      width: 100%;
       font-family: 'Inter', system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
    }

    /* Sidebar */
    .sidebar {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: 250px;
      background: #13133aff;
      color: #fff;
      display: flex;
      flex-direction: column;
      padding: 20px;
      box-sizing: border-box;
      transition: transform 0.3s ease, width 0.3s ease-in-out, background 0.3s ease-in-out;
      z-index: 1000;
      overflow: hidden;
    }

    .sidebar.closed {
      transform: translateX(-100%);
      background: transparent; /* removes dark blue overlay */
      width: 0;
    }

    /* Logo */
    .logo {
      font-size: 26px;
      margin-top: 25px;
      margin-bottom:25px;
      font-weight: 800;
      color: #f8f2f2ff;
      position: relative;
    }

    .close-btn {
      position: absolute;
      right: -5%;
      top: -80%;
      font-size: 22px;
      cursor: pointer;
      color: white;
    }
    .close-btn:hover {
      
      color: #f5f6f7;;
    }

    /* Navigation */
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      flex-grow: 1;
    }

    li {
      margin-bottom: 20px;
    }

    a {
      display: block;
      text-decoration: none;
      color: #cbd5e1;
      padding: 14px 20px;
      border-radius: 8px;
      transition: all 0.3s ease;
      font-size: 16px;
      font-weight: 500;
    }

    a:hover,
    a.active {
      background: #1e293b;
      color: #fff;
      border-left: 4px solid #f7f9fa;
    }

    /* Hamburger */
   /* Hamburger */
.hamburger {
  position: fixed;
  top: 20px;
  left: 20px;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  background: #ffffffff; /* same dark sidebar bg */
  border: none;
  border-radius: 12px;
  cursor: pointer;
  color: #0f0101ff;
  z-index: 1100;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 8px rgba(0,0,0,0.2);
}

/* Hover effect */
.hamburger:hover {
 
  transform: scale(1.05);
  box-shadow: 0px 6px 12px rgba(0,0,0,0.3);
}

/* Make ☰ icon look centered */
.hamburger span {
  font-size: 28px;
  line-height: 1;
}


    /* Logout Button */
    .logout-btn {
      margin-top: auto;
      background: linear-gradient(90deg, #f87171, #ef4444);
      border: none;
      padding: 12px 16px;
      color: #fff;
      font-size: 16px;
      border-radius: 10px;
      margin: 20px;
      cursor: pointer;
      transition: 0.3s;
    }

    .logout-btn:hover {
      background: linear-gradient(90deg, #ef4444, #dc2626);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .sidebar {
        width: 220px;
      }
    }
  `]
})
export class SidebarComponent implements OnInit {
  isClosed = false;

  @Output() sidebarToggle = new EventEmitter<boolean>();

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isClosed = window.innerWidth <= 992;
    this.sidebarToggle.emit(this.isClosed);
  }

  toggleSidebar() {
    this.isClosed = !this.isClosed;
    this.sidebarToggle.emit(this.isClosed);
  }

  logout() {
    localStorage.clear();
    window.location.href = '/';
  }
}
