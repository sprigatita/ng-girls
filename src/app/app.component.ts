import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ListItemDTO } from "./models/listItemDTO";
import { MatActionList, MatList, MatListItem, MatListOption, MatSelectionList } from "@angular/material/list";
import { FormsModule } from "@angular/forms";
import { StorageService } from "./services/storageService/storage.service";
import { TodoListService } from "./services/toDoListService/todo-list.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatActionList, MatListItem, MatListOption, MatSelectionList, MatList, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private storageService: StorageService,
    private toDoListService: TodoListService
  ) { }

  newItem: string = "";
  title = 'TO-DO List';
  public currentToDoList: ListItemDTO[] = [];

  ngOnInit() {
    this.init();
  }

  private init() {
    this.currentToDoList = this.storageService.getToDoList();
  }

  public addItem() {
    const temporaryItem: ListItemDTO = {
      title: this.newItem,
      completed: false,
      isEditing: false
    }
    this.newItem = "";
    this.currentToDoList.push(temporaryItem);
    this.storageService.saveToDoList(this.currentToDoList);
  }

  public removeItem(item: ListItemDTO) {
    this.currentToDoList = this.currentToDoList.filter((itemToFilter) => itemToFilter.title !== item.title);
    this.storageService.saveToDoList(this.currentToDoList);
  }

  public toggleItemStatus(item: ListItemDTO) {
    item.completed = !item.completed;
    this.storageService.saveToDoList(this.currentToDoList);
  }

  public editItem(item: ListItemDTO) {
    item.isEditing = true;
  }

  public updateItem(item: ListItemDTO) {
    item.isEditing = false;
    this.storageService.saveToDoList(this.currentToDoList);
  }

  public cancelEdit(item: ListItemDTO) {
    item.isEditing = false;
  }
}
