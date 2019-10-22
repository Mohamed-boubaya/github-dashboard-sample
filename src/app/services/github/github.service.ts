import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { GithubSearchResult } from '../../models/github/github-search-result';
import { UserGithubInfo } from '../../models/github/user-github-info';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  constructor(private http: HttpClient, private config: ConfigService) {}

  searchUsername(value: string): Observable<GithubSearchResult> {
    const options = {
      params: new HttpParams()
        .set('per_page', '44')
        .set('page', '1')
        .set('q', value)
    };
    return this.http.get<GithubSearchResult>(`${this.config.githubAPI}/search/users`, options);
  }
  userInfo(value: string): Observable<UserGithubInfo> {
    return this.http.get<UserGithubInfo>(`${this.config.githubAPI}/users/${value}`);
  }
  userRepoInfo(value: string): Observable<any[]> {
    const options = {
      params: new HttpParams().set('per_page', '30').set('sort', 'pushed')
    };

    return this.http.get<any[]>(`${this.config.githubAPI}/users/${value}/repos`, options);
  }
}
