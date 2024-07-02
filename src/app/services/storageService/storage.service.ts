import { Injectable } from '@angular/core';
import { ListItemDTO } from "../../models/listItemDTO";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storageKey = 'todoList';

  constructor() { }

  saveToDoList(list: ListItemDTO[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(list));
  }

  getToDoList(): ListItemDTO[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }
}
