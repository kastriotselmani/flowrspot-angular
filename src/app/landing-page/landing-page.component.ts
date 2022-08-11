import { Component, OnInit } from '@angular/core';
import { FlowersService } from '../services/flowers.service';
import { tap, take } from 'rxjs/operators';
import { AuthManagerService } from '../services/auth-manager.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  public flowers: any[] = [];
  public isAuthenticated: boolean = false;
  public id: number = 0;
  constructor(private flowerService: FlowersService, private authManager: AuthManagerService) { }

  ngOnInit(): void {
    this.authManager.isAuthenticated
      .pipe(
        tap((res: boolean) => {
            this.isAuthenticated = res;
            this.getFlowers();
        })
      ).subscribe();
  }

  getFlowers() {
    this.flowerService.getFlowers(1)
      .pipe(
        take(1),
        tap(res => {
          this.flowers = res.flowers
        })
      ).subscribe();
  }

  updateFavoriteFlower(item: any) {
    item.favorite = item.favorite ? false : true;
  }

}
