import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Url } from '../url';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private router: Router,
    private http: HttpClient
    ) { }

    getResultMatchDemi(): Observable<any> {
      return this.http.get<any>(Url.url + '/api/v.1.0.0/result_match_demi');
    }

    getResultMatchFinale(): Observable<any> {
      return this.http.get<any>(Url.url + '/api/v.1.0.0/result_match_finale');
    }

    getListTeams(): Observable<any> {
      return this.http.get<any>(Url.url + '/api/v.1.0.0/list_teams');
    }

    getListPlayers(): Observable<any> {
      return this.http.get<any>(Url.url + '/api/v.1.0.0/list_players');
    }
}
