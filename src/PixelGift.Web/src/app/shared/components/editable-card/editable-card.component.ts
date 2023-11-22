import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editable-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './editable-card.component.html',
  styleUrl: './editable-card.component.scss',
})
export class EditableCardComponent {
  private el = inject(ElementRef);

  active = false;

  @Input() menuItems: string[] = [];
  @Output() menuItemClicked = new EventEmitter<string>();

  @HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    const clickedInside = this.el.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.active = false;
    }
  }
}
