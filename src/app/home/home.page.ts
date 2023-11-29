import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonFooter,
  IonToolbar,
  IonContent,
  IonTitle,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  standalone: true,
  imports: [
    IonHeader,
    IonFooter,
    IonToolbar,
    IonContent,
    IonTitle,
    CommonModule,
    FormsModule,
  ],
})
export class HomePage {
  constructor() {}
}
