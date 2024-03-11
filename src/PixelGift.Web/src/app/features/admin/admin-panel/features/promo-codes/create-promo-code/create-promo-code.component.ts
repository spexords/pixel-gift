import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagePromoCodeFormComponent } from '../manage-promo-code-form/manage-promo-code-form.component';
import { Store } from '@ngrx/store';
import { AdminActions } from '../../../state';
import { PromoCodePayloadRequest } from '../../../models';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-create-promo-code',
  standalone: true,
  imports: [CommonModule, ManagePromoCodeFormComponent],
  templateUrl: './create-promo-code.component.html',
  styleUrl: './create-promo-code.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePromoCodeComponent {
  private store = inject(Store);

  onSubmit(promoCode: PromoCodePayloadRequest): void {
    promoCode.id = uuidv4();
    this.store.dispatch(AdminActions.createPromoCode({ promoCode }));
  }
}
