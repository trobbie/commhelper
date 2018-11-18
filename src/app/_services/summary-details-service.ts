import { Observable } from 'rxjs';

import { DetailSummary } from '../_models/detail-summary';

// Implement SummaryDetailsService to use in summary-detail list components
export interface SummaryDetailsService {
    getSummaryList(): Observable<DetailSummary[]>;
    getSummary(id: number): Observable<DetailSummary>;
}
