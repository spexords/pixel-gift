import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { EditableCardComponent } from 'src/app/shared/components/editable-card/editable-card.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateItemComponent } from './create-item/create-item.component';
import { UpdateItemComponent } from './update-item/update-item.component';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { AdminActions, AdminSelectors } from '../../state';
import { ItemAdmin } from '../../models';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [
    CommonModule,
    EditableCardComponent,
    ConfirmationModalComponent,
    LetDirective,
  ],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsComponent implements OnInit {
  private dialog = inject(MatDialog);
  private store = inject(Store);

  existingItemMenuItems = ['Update', 'Delete'];
  items$ = this.store.select(AdminSelectors.selectItems);

  ngOnInit(): void {
    this.store.dispatch(AdminActions.getItems());
  }

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
        this.store.dispatch(AdminActions.deleteItem({ id: item.id }));
      }
    });
  }

  handleNewItem(): void {
    this.dialog.open(CreateItemComponent);
  }
}
