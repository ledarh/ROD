import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Http, Headers, RequestOptions } from "@angular/http";
import { ActivatedRoute } from "@angular/router";
import * as ApplicationSettings from "application-settings";
import "rxjs";

@Component({
    selector: "ns-home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ["./home-common.css"]
})
export class HomeComponent implements OnInit {

    public name: string = ApplicationSettings.getString("name");
    public isAA: boolean;
    constructor(private http: Http, private route: ActivatedRoute) { }

    onLogout() {
        // Navigate to login page with clearHistory
        console.log("logout");
    }

    ngOnInit(): void {

        alert(ApplicationSettings.getString("name"));
    }
    soberDaysNum: String = ApplicationSettings.getString("soberDays");

}