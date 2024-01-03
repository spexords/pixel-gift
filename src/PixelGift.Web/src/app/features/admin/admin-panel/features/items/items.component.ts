import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelService } from '../../admin-panel.service';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { EditableCardComponent } from 'src/app/shared/components/editable-card/editable-card.component';
import { ItemAdmin } from 'src/app/core/models';
import { MatDialog } from '@angular/material/dialog';
import { CreateItemComponent } from './create-item/create-item.component';
import { UpdateItemComponent } from './update-item/update-item.component';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [CommonModule, EditableCardComponent, ConfirmationModalComponent],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsComponent {
  private adminPanelService = inject(AdminPanelService);
  private dialog = inject(MatDialog);

  existingItemMenuItems = ['Update', 'Delete'];
  items$ = this.adminPanelService.items$;

  handleExistingItemMenuClicked(menuItem: string, item: ItemAdmin): void {
    switch (menuItem) {
      case 'Update':
        this.handleUpdateItem(item.id);
        break;
      case 'Delete':
        this.handleDeleteItem(item);
        break;
    }
  }

  handleUpdateItem(id: string): void {
    this.dialog.open(UpdateItemComponent, { data: id });
  }

  handleDeleteItem(item: ItemAdmin): void {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: `Are you sure you want to remove ${item.name}?`,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.adminPanelService.deleteItem(item.id).subscribe();
      }
    });
  }

  handleNewItem(): void {
    this.dialog.open(CreateItemComponent);
  }
}
