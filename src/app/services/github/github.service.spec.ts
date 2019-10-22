import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { GithubService } from './github.service';
import { SearchGithubComponent } from '../../modules/github/search-github/search-github.component';
import { HttpEvent } from '@angular/common/http';

describe('GithubApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubService]
    });
  });
  it('should get users', inject(
    [HttpTestingController, GithubService],
    (httpMock: HttpTestingController, githubService: GithubService) => {
      const username = 'Mohamed';
      const mockUsers = [{ name: 'Bob', website: 'www.yessss.com' }, { name: 'Juliette', website: 'nope.com' }];

      githubService.searchUsername(username).subscribe(res => {
      });

      // const mockReq = httpMock.expectOne(dataService.url);
      //
      // expect(mockReq.cancelled).toBeFalsy();
      // expect(mockReq.request.responseType).toEqual('json');
      //
      // mockReq.flush(mockUsers);

     // httpMock.verify();
    }
  ));
});
