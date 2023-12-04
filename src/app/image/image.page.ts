import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AIService } from '@app/services/ai.service';
import {
  IonHeader,
  IonFooter,
  IonToolbar,
  IonContent,
  IonTitle,
  IonButton,
  IonButtons,
  IonMenuButton,
  IonProgressBar,
  IonInput,
  IonList,
  IonItem,
  IonRange,
  IonLabel,
  IonImg,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-image',
  templateUrl: './image.page.html',
  standalone: true,
  imports: [
    IonHeader,
    IonFooter,
    IonToolbar,
    IonContent,
    IonTitle,
    IonButton,
    IonButtons,
    IonMenuButton,
    IonImg,
    IonInput,
    IonList,
    IonItem,
    IonRange,
    IonLabel,
    IonProgressBar,
    ReactiveFormsModule,
  ],
})
export default class ImagePage {
  private aiService = inject(AIService);
  private formBuilder = inject(FormBuilder);
  image = signal('');
  showLoading = signal(false);
  form = this.formBuilder.nonNullable.group({
    prompt: ['', Validators.required],
    steps: [10, Validators.required],
  });

  constructor() {}

  generateImage() {
    if (this.form.valid) {
      const { prompt, steps } = this.form.getRawValue();
      this.showLoading.set(true);
      this.aiService.generateImage(prompt, steps).subscribe((res) => {
        this.image.set(`data:image/png;base64,${res.content}`);
        this.showLoading.set(false);
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
