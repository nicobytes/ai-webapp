import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  IonHeader,
  IonFooter,
  IonToolbar,
  IonContent,
  IonTitle,
  IonProgressBar,
  IonNote,
  IonIcon,
  IonButton,
  IonText,
  IonList,
  IonItem,
  IonInput,
  IonButtons,
  IonMenuButton
} from '@ionic/angular/standalone';
import { AIService } from '@app/services/ai.service';
import { addIcons } from 'ionicons';
import { send } from 'ionicons/icons';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  standalone: true,
  imports: [
    IonHeader,
    IonFooter,
    IonToolbar,
    IonContent,
    IonProgressBar,
    IonTitle,
    IonNote,
    IonIcon,
    IonButton,
    IonText,
    IonList,
    IonItem,
    IonInput,
    IonButtons,
    IonMenuButton,
    CommonModule,
    ReactiveFormsModule,
  ],
})
export default class ChatPage {
  aiService = inject(AIService);
  messages = signal<string[]>([]);
  showLoading = signal(false);
  textareaCtrl = new FormControl('', { nonNullable: true });

  constructor() {
    addIcons({ send });
  }

  sendMessage() {
    const message = this.textareaCtrl.value;
    this.textareaCtrl.setValue('');
    this.messages.update((messages) => [...messages, message]);
    this.showLoading.update((state) => !state);
    this.aiService.sendMessage(message).subscribe((newMessage) => {
      this.messages.update((messages) => [...messages, newMessage]);
      this.showLoading.update((state) => !state);
    });
  }
}
