import { Component, Inject, OnInit } from '@angular/core';
import { ActionCreator, ACTION_CREATOR_TOKEN } from '../../core/action-creator';
import { Store, STORE_TOKEN } from '../../core/store';
import { USER_KINDS, UserKind } from '../../core/constants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  url: string;
  userKinds: UserKind[] = USER_KINDS;
  selected: UserKind[] = this.store.includeUserKinds;

  constructor(
    @Inject(ACTION_CREATOR_TOKEN) private actions: ActionCreator,
    @Inject(STORE_TOKEN) private store: Store,
  ) {
    store.on('change', () => this.selected = this.store.includeUserKinds);
  }

  checkUserKind(userKind: UserKind, {checked}) {
    this.actions.checkUserKind(userKind, checked);
  }

  submit(): void {
    if (!this.url) {
      return;
    }

    this.actions.updateUsers(this.url);
  }

  ngOnInit() {
  }
}