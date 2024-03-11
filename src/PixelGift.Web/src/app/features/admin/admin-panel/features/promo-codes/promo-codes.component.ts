import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EditableCardComponent } from 'src/app/shared/components/editable-card/editable-card.component';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { CreatePromoCodeComponent } from './create-promo-code/create-promo-code.component';
import { UpdatePromoCodeComponent } from './update-promo-code/update-promo-code.component';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { AdminActions, AdminSelectors } from '../../state';
import { PromoCode } from '../../models';

@Component({
  selector: 'app-promo-codes',
  standalone: true,
  imports: [CommonModule, EditableCardComponent, LetDirective],
  templateUrl: './promo-codes.component.html',
  styleUrl: './promo-codes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromoCodesComponent implements OnInit {
  private store = inject(Store);
  private dialog = inject(MatDialog);

  existingItemMenuItems = ['Update', 'Delete'];
  promoCodes$ = this.store.select(AdminSelectors.selectPromoCodes);

  ngOnInit(): void {
    this.store.dispatch(AdminActions.getPromoCodes());
  }

  handleExistingItemMenuClicked(menuItem: string, item: PromoCode): void {
    switch (menuItem) {
      case 'Update':
        this.handleUpdatePromoCode(item.id);
        break;
      case 'Delete':
        this.handleDeletePromoCode(item);
        break;
    }
  }

  handleUpdatePromoCode(id: string): void {
    this.dialog.open(UpdatePromoCodeComponent, { data: id });
  }

  handleDeletePromoCode(promoCode: PromoCode): void {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: `Are you sure you want to remove ${promoCode.code}?`,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(AdminActions.deletePromoCode({ id: promoCode.id }));
      }
    });
  }

  handleCreatePromoCode(): void {
    this.dialog.open(CreatePromoCodeComponent);
  }
}
