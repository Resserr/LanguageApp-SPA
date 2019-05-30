import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LanguageService } from '../_services/language.service';
@Injectable({
  providedIn: 'root'
})
export class ProfileEditLangResolver implements Resolve<any> {
  constructor(
      private langService: LanguageService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.langService.getAllLanguages();
  }
}
