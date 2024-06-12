import { Component } from '@angular/core';
import { SearchService } from '../search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchCriteria = '';
  selectedExtension = '';
  folderPath = '';
  searchResults: any[] = [];


  constructor(private searchService: SearchService, private router : Router) { }

  performSearch() {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      alert('Please log in first.');
      this.router.navigate(['/login']);
      return;
    }

    this.searchService.performSearch(authToken, this.searchCriteria, this.selectedExtension, this.folderPath)
      .subscribe(
        results => {
          this.searchResults = results;
        },
        error => {
          alert('Search failed' + error.error);
          console.error('Search Error', error);
        }
      );
  }

  scrollResults(direction: string) {
    const resultContainer = document.querySelector('.result-container');
    if (resultContainer) {
      const scrollAmount = 100000;
      if (direction === 'up') {
        resultContainer.scrollTop -= scrollAmount;
      } else if (direction === 'down') {
        resultContainer.scrollTop += scrollAmount;
      }
    }
  }

  downloadResults() {
    const searchResult = this.searchResults.map(result =>
      `File: ${result.fileName}\nPath: ${result.filePath}\nMethod: ${result.methodName}\nLine: ${result.lineNumber}\n\n`
    ).join('');
    const blob = new Blob([searchResult], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'search_results.txt';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
  }
}
