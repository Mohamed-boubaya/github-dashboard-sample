import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../../services/github/github.service';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { UserGithubInfo } from '../../../models/github/user-github-info';
@Component({
  selector: 'app-dashbord-github',
  templateUrl: './dashbord-github.component.html',
  styleUrls: ['./dashbord-github.component.scss']
})
export class DashbordGithubComponent implements OnInit {
  username: string;
  error: boolean = false;
  userGithubInfo: UserGithubInfo = {} as UserGithubInfo;
  repoGithubInfo: any[] = [] as any[];
  repoName: string;
  selectRepo: any;
  constructor(private router: Router, private githubService: GithubService, private route: ActivatedRoute) {
    this.route.params.subscribe(routeParams => {
      if (routeParams.username) {
        this.username = routeParams.username;
      } else {
        this.router.navigate(['/']);
      }
    });
    this.route.queryParams.subscribe(queryParams => {
      if (queryParams.repo) {
        this.repoName = queryParams.repo;
        this.selectRepo = this.repoGithubInfo.filter(repo => repo.name === this.repoName)[0] || {};
      } else {
        this.selectRepo = null;
      }
    });
  }

  ngOnInit() {
    forkJoin(this.githubService.userInfo(this.username), this.githubService.userRepoInfo(this.username)).subscribe(
      all => {
        if (all[0]) {
          this.userGithubInfo = all[0];
        }
        if (all[1]) {
          this.repoGithubInfo = all[1];
          if (this.repoName) {
            this.selectRepo = this.repoGithubInfo.filter(repo => repo.name === this.repoName)[0] || {};
          }
        }
      },
      () => {
        this.error = true;
        this.router.navigate(['/users/notFound']);
      }
    );
  }
}
