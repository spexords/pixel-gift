import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AdminPanelService } from '../../admin-panel.service';
import { EditableCardComponent } from 'src/app/shared/components/editable-card/editable-card.component';
import { PromoCode } from 'src/app/core/models';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { CreatePromoCodeComponent } from './create-promo-code/create-promo-code.component';
import { UpdatePromoCodeComponent } from './update-promo-code/update-promo-code.component';
import { LetDirective } from '@ngrx/component';

@Component({
  selector: 'app-promo-codes',
  standalone: true,
  imports: [CommonModule, EditableCardComponent, LetDirective],
  templateUrl: './promo-codes.component.html',
  styleUrl: './promo-codes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromoCodesComponent {
  private adminPanelService = inject(AdminPanelService);
  private dialog = inject(MatDialog);

  existingItemMenuItems = ['Update', 'Delete'];
  promoCodes$ = this.adminPanelService.promoCodes$;

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
        this.adminPanelService.deletePromoCode(promoCode.id).subscribe();
      }
    });
  }

  handleCreatePromoCode(): void {
    this.dialog.open(CreatePromoCodeComponent);
  }
}
