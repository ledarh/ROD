import { Component, OnInit } from '@angular/core';
import { DataService, IDataItem } from "../shared/data.service";

@Component({
  selector: 'ns-bigbook',
  templateUrl: './bigbook.component.html',
  styleUrls: ['./bigbook.component.css'],
  moduleId: module.id,
})
export class BigbookComponent implements OnInit {

  items: Array<IDataItem>;

  constructor(private _itemService: DataService) { }

  ngOnInit() {

    this.items = this._itemService.getItems();

  }

}
