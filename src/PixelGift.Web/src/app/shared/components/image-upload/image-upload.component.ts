import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.scss',
})
export class ImageUploadComponent {
  private cdr = inject(ChangeDetectorRef);

  imageUrl: string | null = null;

  @Output() changed = new EventEmitter<string>();

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    // Display the selected image preview
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;

        // Extract the base64 content without the data URI header
        const base64String = e.target.result.split(',')[1];

        this.cdr.markForCheck();

        this.changed.emit(base64String);
      };
      reader.readAsDataURL(file);
    }
  }
}
