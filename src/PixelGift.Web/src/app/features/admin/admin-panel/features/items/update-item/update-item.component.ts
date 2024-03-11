import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageItemFormComponent } from '../manage-item-form/manage-item-form.component';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { AdminActions, AdminSelectors } from '../../../state';
import { ItemPayloadRequest } from '../../../models';

@Component({
  selector: 'app-update-item',
  standalone: true,
  imports: [CommonModule, ManageItemFormComponent, LetDirective],
  templateUrl: './update-item.component.html',
  styleUrl: './update-item.component.scss',
})
export class UpdateItemComponent implements OnInit {
  private store = inject(Store);
  item$ = this.store.select(AdminSelectors.selectItem);

  constructor(@Inject(MAT_DIALOG_DATA) public id: string) {}

  ngOnInit(): void {
    this.store.dispatch(AdminActions.getItem({ id: this.id }));
  }

  onSubmit(item: ItemPayloadRequest): void {
    this.store.dispatch(AdminActions.updateItem({ item }));
  }
}
