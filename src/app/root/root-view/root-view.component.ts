import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isEmpty } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { TAB_NAV } from 'src/app/types/const';

@Component({
  selector: 'app-root-view',
  templateUrl: './root-view.component.html',
  styleUrls: ['./root-view.component.scss']
})
export class RootViewComponent implements OnInit, OnChanges {

  tabs = TAB_NAV;
  activeLink = this.tabs[0].link;
  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(param => {
      this.setActiveLink();
    });
  }

  ngOnChanges() {
    this.setActiveLink();
  }

  setActiveLink() {
    if (this.router.url) {
      const arrParams = this.router.url.split('?');
      this.activeLink = arrParams[0];
    }
  }

  logout() {
    this.auth.logout().subscribe(rs => {
      this.router.navigate(['/login']);
    }, () => {});
  }
}
