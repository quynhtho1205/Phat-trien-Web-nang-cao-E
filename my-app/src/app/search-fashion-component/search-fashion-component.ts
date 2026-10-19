import { Component, computed, signal } from '@angular/core';
import { Fashion } from '../classes/Fashion';
import { FashionAPIService } from '../services/fashion-apiservice';

// A Fashion row in the result list, with its similarity score
export class RankedFashion extends Fashion {
  similarity: number = 0;
}

@Component({
  selector: 'app-search-fashion-component',
  standalone: false,
  templateUrl: './search-fashion-component.html',
  styleUrl: './search-fashion-component.css',
})
export class SearchFashionComponent {
  // Search options
  keyword = '';
  field: 'subject' | 'detail' = 'subject';
  metric: 'cosine' | 'jaccard' = 'cosine';
  top = 10;
  topOptions = [5, 10, 20, 50, 0]; // 0 = all

  // Results
  results = signal<RankedFashion[]>([]);
  searchedMetric = signal<'cosine' | 'jaccard'>('cosine');
  searched = signal(false);
  loading = signal(false);
  errMessage = signal('');

  // Count rows of each similarity level (for the summary badges)
  highCount = computed(() => this.results().filter((f) => f.similarity >= 0.75).length);
  mediumCount = computed(
    () => this.results().filter((f) => f.similarity >= 0.5 && f.similarity < 0.75).length,
  );
  lowCount = computed(() => this.results().filter((f) => f.similarity < 0.5).length);

  constructor(private _service: FashionAPIService) {}

  // "See more" for long descriptions
  readonly DETAIL_LIMIT = 180; // characters shown before "See more"
  expanded = signal<Set<string>>(new Set());

  isLong(text: string): boolean {
    return (text || '').length > this.DETAIL_LIMIT;
  }

  isExpanded(id: string): boolean {
    return this.expanded().has(id);
  }

  toggleDetail(id: string) {
    const next = new Set(this.expanded());
    next.has(id) ? next.delete(id) : next.add(id);
    this.expanded.set(next);
  }

  search() {
    const keyword = this.keyword.trim();
    if (!keyword) {
      this.errMessage.set('Please enter a keyword to search.');
      return;
    }
    this.errMessage.set('');
    this.loading.set(true);
    this._service.searchBySimilarity(keyword, this.field, this.metric, this.top).subscribe({
      next: (data) => {
        this.results.set(data.map((f: any) => Object.assign(new RankedFashion(), f)));
        this.searchedMetric.set(this.metric);
        this.expanded.set(new Set());
        this.searched.set(true);
        this.loading.set(false);
      },
      error: (err) => {
        this.errMessage.set(err.message);
        this.loading.set(false);
      },
    });
  }

  // Label shown on each card
  levelLabel(similarity: number): string {
    if (similarity >= 0.75) return 'High match';
    if (similarity >= 0.5) return 'Medium match';
    return 'Low match';
  }

  // Width of the similarity bar (at least 4% so it is always visible)
  barWidth(similarity: number): number {
    return Math.max(4, Math.round(similarity * 100));
  }

  // CSS class of a row based on its similarity
  levelClass(similarity: number): string {
    if (similarity >= 0.75) return 'sim-high';
    if (similarity >= 0.5) return 'sim-medium';
    return 'sim-low';
  }
}
