import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageItemFormComponent } from '../manage-item-form/manage-item-form.component';
import { Store } from '@ngrx/store';
import { AdminActions } from '../../../state';
import { ItemPayloadRequest } from '../../../models';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-create-item',
  standalone: true,
  imports: [CommonModule, ManageItemFormComponent],
  templateUrl: './create-item.component.html',
  styleUrl: './create-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateItemComponent {
  private store = inject(Store);

  onSubmit(item: ItemPayloadRequest): void {
    item.id = uuidv4();
    this.store.dispatch(AdminActions.createItem({ item }));
  }
}
