import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { environment } from '@env/environment';

export interface SearchResponse {
  count: number;
  matches: Array<{
    score: number;
    vector: {
      id: string;
      metadata: {
        title: string;
        overview: string;
      }
    }
  }>;
}

@Injectable({
  providedIn: 'root',
})
export class AIService {
  http = inject(HttpClient);

  sendMessage(message: string) {
    return this.http.post<string>(`${environment.API_URL}/api/v1/chat/code`, {
      message,
    });
  }

  generateImage(prompt: string, steps: number) {
    return this.http.post<{
      content: string;
    }>(`${environment.API_URL}/api/v1/image`, {
      prompt,
      num_steps: steps
    });
  }

  search(query: string) {
    return this.http.get<SearchResponse>(`${environment.API_URL}/api/v1/search`, {
      params: {
        query,
      },
    });
  }
}
