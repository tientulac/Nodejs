import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { common } from '../commons/app.common';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  
  public com: common | undefined;

  constructor(private router: Router) {}

  login() {    
    this.com = new common(this.router);
    var jsonInfo = this.com.getUserinfo();
    if (jsonInfo != undefined) {
      var classCheck = jsonInfo.Classification.toString();
      if (classCheck == "1") {
        this.router.navigate(['/admin/hanttech']);
      }
      if (classCheck == "2") {
        this.router.navigate(['/admin/builder']);
      };
    }
  }

  logout() {
    localStorage.removeItem('AccountInfo');
    this.router.navigate(['/login']);
  }
}

