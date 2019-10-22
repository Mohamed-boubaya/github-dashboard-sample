import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { fromEvent } from 'rxjs';
import { distinctUntilChanged, throttleTime } from 'rxjs/operators';
import { GithubService } from '../../../services/github/github.service';
import { GithubSearchResult, Items } from '../../../models/github/github-search-result';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search-github',
  templateUrl: './search-github.component.html',
  styleUrls: ['./search-github.component.scss'],
  animations: [
    trigger('alertDisplay', [
      transition(':enter', [
        style({ transform: 'scale(0.8)', opacity: '0', height: '0' }),
        animate(100, style({ height: '100%' })),
        animate(300, style({ transform: 'scale(1)', opacity: '1' }))
      ]),
      transition(':leave', [
        animate(300, style({ transform: 'scale(0.5)', opacity: '0' })),
        animate(100, style({ height: '0' }))
      ])
    ])
  ]
})
export class SearchGithubComponent implements OnInit, AfterViewInit {
  @ViewChild('username') username: ElementRef<HTMLElement>;
  @ViewChild('dropRef') dropRef: ElementRef<HTMLElement>;
  errorChosse: boolean = false;
  notFoundFolder: boolean = false;
  lanceOfSearch: boolean = false;
  searchLoading: boolean = false;
  checked: boolean = false;
  githubData: GithubSearchResult = {} as GithubSearchResult;

  constructor(private githubService: GithubService, private router: Router) {}

  ngOnInit() {}

  gotToUserPage() {
    const userGithubInfo = this.githubData.items.filter(
      elm => elm.login === (this.username.nativeElement as HTMLInputElement).value
    );
    if (userGithubInfo[0]) {
      this.router.navigate(['/', userGithubInfo[0].login]);
    } else {
      // TODO  erreur
    }
  }

  ngAfterViewInit(): void {
    fromEvent(this.username.nativeElement, 'keyup')
      .pipe(
        throttleTime(500),
        distinctUntilChanged()
      )
      .subscribe(username => {
        this.checked = false;
        this.lanceOfSearch = !this.lanceOfSearch;
        this.searchLoading = !this.searchLoading;
        this.githubService.searchUsername((username.target as HTMLInputElement).value).subscribe(
          data => {
            if (data.total_count !== 0) {
              this.githubData = data;
              this.searchLoading = !this.searchLoading;
              this.errorChosse = false;
            } else {
              this.githubData = data;
              this.searchLoading = !this.searchLoading;
              this.errorChosse = true;
            }
          },
          () => {
            this.githubData = null;
            this.searchLoading = !this.searchLoading;
            this.errorChosse = true;
          }
        );
      });
  }

  onClick(result: Items) {
    this.checked = true;
    (this.username.nativeElement as HTMLInputElement).value = result.login || '';
  }
}
