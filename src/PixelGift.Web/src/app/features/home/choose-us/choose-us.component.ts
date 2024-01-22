import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';
import { Scrollable } from 'src/app/core/models';

@Component({
  selector: 'app-choose-us',
  standalone: true,
  imports: [CommonModule, TranslocoPipe],
  templateUrl: './choose-us.component.html',
  styleUrl: './choose-us.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseUsComponent implements Scrollable {
  @ViewChild('scrollTarget') scrollTarget!: ElementRef;

  scrollIntoView() {
    const element = this.scrollTarget.nativeElement.offsetTop;

    window.scroll({
      top: element,
      behavior: 'smooth',
    });
  }
}
