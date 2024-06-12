import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = 'https://localhost:7292/api/Search';

  constructor(private http: HttpClient) { }

  performSearch(authToken: string, searchCriteria: string, selectedExtension: string, folderPath: string): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl,
      { authToken,searchCriteria, selectedExtension, folderPath },
      { headers: { 'Authorization': `Bearer ${authToken}` } });
  }
}
