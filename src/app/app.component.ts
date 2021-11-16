import { Component, OnInit } from '@angular/core';

import { LanguageService } from '@services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private _languageService: LanguageService
  ) {
  }

  public ngOnInit(): void {
    this._languageService.init();
  }

}
