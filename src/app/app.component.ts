import {Component, OnInit} from '@angular/core';
import * as fromAppStore from './store/app.reducer'
import * as fromAuthActions from './auth/store/auth.actions'
import {Store} from "@ngrx/store";
import {fetch_recipes} from "./recipes/store/recipes.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(
      private store: Store<fromAppStore.AppState>
  ) {

  }

  ngOnInit() {
      this.store.dispatch(new fromAuthActions.AutoLogin())
  }

}
