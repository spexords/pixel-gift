import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';
import { NavbarService } from 'src/app/core/navigation/navbar/navbar.service';
import { Store } from '@ngrx/store';
import { HomeActions } from '../../state';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [CommonModule, TranslocoPipe],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryCardComponent implements OnInit {
  private navbarService = inject(NavbarService);
  private store = inject(Store);

  @HostBinding('style.background-image') back!: any;
  @HostBinding('style.margin-top') mt!: any;
  @Input() even = false;
  @Input({ required: true }) background!: string;
  @Input({ required: true }) logo!: string;
  @Input({ required: true }) categoryName!: string;

  moveToStore() {
    this.store.dispatch(
      HomeActions.chooseCategoryByName({ name: this.categoryName })
    );
    this.navbarService.scroll('store');
  }

  ngOnInit(): void {
    this.back = `url('${this.background}')`;
    if (this.even) {
      this.mt = '35px';
    }
  }
}
