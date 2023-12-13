import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AIService, SearchResponse } from '@app/services/ai.service';
import {
  IonHeader,
  IonFooter,
  IonToolbar,
  IonContent,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonSearchbar,
  IonList,
  IonItem,
  IonProgressBar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  standalone: true,
  imports: [IonHeader,
    IonFooter,
    IonToolbar,
    IonContent,
    IonTitle,
    IonButtons,
    IonSearchbar,
    IonList,
    IonItem,
    IonProgressBar,
    IonMenuButton, ReactiveFormsModule]
})
export default class SearchPage {
  private aiService = inject(AIService);
  results = signal<SearchResponse['matches']>([]);
  showLoading = signal(false);

  inputCtrl = new FormControl('', {
    nonNullable: true
  });

  constructor() { }

  doSearch() {
    this.showLoading.set(true);
    const query = this.inputCtrl.value;
    this.aiService.search(query).subscribe(data => {
      this.results.set(data.matches);
      this.showLoading.set(false);
    });

  }

}
