import { Component, OnInit } from '@angular/core';
import {NgIcon, provideIcons} from '@ng-icons/core'
import { tablerCloudUpload, tablerUser, tablerChevronLeft, tablerTrash } from '@ng-icons/tabler-icons';

@Component({
  selector: 'app-profile',
  providers: [provideIcons({tablerUser, tablerCloudUpload, tablerChevronLeft, tablerTrash})],
  imports: [NgIcon],
  templateUrl: './profile.html',
})
export class Profile implements OnInit {
  imagePreview: string | null = null;
  selectedImage: File | null = null;

  ngOnInit(): void {
  }

  onImageSelected(event: Event): void {

    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      input.value = '';
      return;
    }

    if (this.imagePreview) {
      URL.revokeObjectURL(this.imagePreview);
    }

    this.selectedImage = file;
    this.imagePreview = URL.createObjectURL(file);
  }

  removeImagen(event: any) {
    this.selectedImage = null
    this.imagePreview = null
    event.stopPropagation()
  }
}
