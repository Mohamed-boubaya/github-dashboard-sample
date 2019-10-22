import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {SearchGithubComponent} from './search-github/search-github.component';
import {DashbordGithubComponent} from './dashbord-github/dashbord-github.component';

const routes: Routes = [
  {
    path: '',
    component: SearchGithubComponent
  },  {
    path: ':username',
    component: DashbordGithubComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GithubRoutingModule {}
