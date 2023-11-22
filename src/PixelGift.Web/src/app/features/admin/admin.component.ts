import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from './admin.service';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  providers: [AdminService],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {}
