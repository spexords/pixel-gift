import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, SidebarComponent, RouterOutlet],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPanelComponent {}
