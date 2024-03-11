import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from 'src/app/core/navigation/breadcrumb/breadcrumb.component';
import { FooterComponent } from 'src/app/core/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { OrderPreviewFormService } from './order-preview/order-preview-form.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, FooterComponent, RouterOutlet],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [OrderPreviewFormService],
})
export class ShoppingCartComponent {}
