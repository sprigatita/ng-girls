import { Injectable } from '@angular/core';
import { ListItemDTO } from "../../models/listItemDTO";

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  public todoList: ListItemDTO[] = [];

  constructor() { }

  public getTodoList(): ListItemDTO[] {
    return this.todoList;
  }


}
