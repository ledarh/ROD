import { Component, OnInit } from "@angular/core";
import { DataService, DataItem } from "../data.service";

@Component({
    selector: "ns-alert",
    moduleId: module.id,
    templateUrl: "./alert.component.html",
})
export class AlertComponent implements OnInit {
    items: DataItem[];

    constructor(private itemService: DataService) { }

    ngOnInit(): void {

    }
}