import { Observable } from 'rxjs';

import { DetailSummary } from '../_models/detail-summary';

// Implement SummaryDetailsService to use in summary-detail list components
export interface SummaryDetailsService {
    // implementation note: summaries must be calculated from data in details
    getSummaryList(): Observable<DetailSummary[]>;
    // implementation note: summary must be calculated from data in details
    getSummary(id: number): Observable<DetailSummary>;
}
