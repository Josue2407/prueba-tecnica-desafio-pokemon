import { Component, inject } from '@angular/core';
import {NgIcon, provideIcons} from '@ng-icons/core'
import { tablerCloudUpload, tablerUser, tablerChevronLeft, tablerTrash } from '@ng-icons/tabler-icons';
import { FlowStateService, FlowState } from '../../core/services/flow-state.service';

@Component({
  selector: 'app-profile',
  providers: [provideIcons({tablerUser, tablerCloudUpload, tablerChevronLeft, tablerTrash})],
  imports: [NgIcon],
  templateUrl: './profile.html',
})
export class Profile {

  flowStateService = inject(FlowStateService)
  readonly flowState = FlowState

  imagePreview: string | null = null;
  selectedImage: File | null = null;


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

  getUserInfo(){
    const info = sessionStorage.getItem('infoUser')
    return JSON.parse(info ?? '')
  }
}
