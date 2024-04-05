import {afterNextRender, Component, inject, OnInit, PLATFORM_ID} from '@angular/core';
import UsersService from "../users.service";
import {FormBuilder} from "@angular/forms";
import {User} from "../user.type";
import {SortConfig} from "../sort-config.type";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {

  usersService = inject(UsersService);
  platformId = inject(PLATFORM_ID);
  formBuilder = inject(FormBuilder);
  columns: Array<keyof User> = ['id', 'name', 'age'];
  sortConfig: SortConfig = {
    column: 'id',
    order: 'asc'
  };
  users: User[] = [];
  nameQuery = '';
  searchForm = this.formBuilder
    .nonNullable
    .group({
      nameQuery: ''
    });

  constructor() {
    afterNextRender(() => {
      console.log(this.platformId);
    });
  }

  loadData() {
    console.log('Loading users...');
    this.usersService.getUsers(this.sortConfig, this.nameQuery)
      .subscribe(users => this.users = users);
  }

  ngOnInit(): void {
    this.loadData();
  }

  isDescSorting(column: string): boolean {
    return this.sortConfig.column === column && this.sortConfig.order === 'desc';
  }

  sortTable(column: string) {
    const order = this.isDescSorting(column) ? 'asc' : 'desc';
    this.sortConfig = {
      column,
      order
    };
    this.loadData();
  }

  search() {
    this.nameQuery = this.searchForm.value.nameQuery ?? '';
    this.loadData();
  }

}
