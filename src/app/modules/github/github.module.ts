import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubRoutingModule } from './github-routing.module';
import { FormsModule } from '@angular/forms';
import { SearchGithubComponent } from './search-github/search-github.component';
import {DashbordGithubComponent} from './dashbord-github/dashbord-github.component';

@NgModule({
  declarations: [SearchGithubComponent, DashbordGithubComponent],
  imports: [CommonModule, GithubRoutingModule, FormsModule]
})
export class GithubModule {}
