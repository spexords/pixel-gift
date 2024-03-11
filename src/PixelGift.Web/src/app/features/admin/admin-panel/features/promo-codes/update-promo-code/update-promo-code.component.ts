import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManagePromoCodeFormComponent } from '../manage-promo-code-form/manage-promo-code-form.component';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { AdminActions, AdminSelectors } from '../../../state';
import { PromoCodePayloadRequest } from '../../../models';

@Component({
  selector: 'app-update-promo-code',
  standalone: true,
  imports: [CommonModule, ManagePromoCodeFormComponent, LetDirective],
  templateUrl: './update-promo-code.component.html',
  styleUrl: './update-promo-code.component.scss',
})
export class UpdatePromoCodeComponent implements OnInit {
  private store = inject(Store);

  constructor(@Inject(MAT_DIALOG_DATA) public id: string) {}

  ngOnInit(): void {
    this.store.dispatch(AdminActions.getPromoCode({ id: this.id }));
  }

  promoCode$ = this.store.select(AdminSelectors.selectPromoCode);

  onSubmit(promoCode: PromoCodePayloadRequest): void {
    this.store.dispatch(AdminActions.updatePromoCode({ promoCode }));
  }
}
