import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Http, Headers, RequestOptions } from "@angular/http";
import { ActivatedRoute } from "@angular/router";
import {TextView} from "tns-core-modules/ui/text-view";
import * as ApplicationSettings from "application-settings";
import { SnackBar } from "nativescript-snackbar";
import "rxjs";

@Component({
    selector: "ns-home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ["./home-common.css"]
})
export class HomeComponent implements OnInit {

    public jwt: string;
    public name: string = ApplicationSettings.getString("name");
    public isAA: boolean;
    public meditation: string;
    public lastMeditationCheck: number;
    public timeNow: number;
    public MeditationTimeDiff: Number;
    soberDaysNum: String = ApplicationSettings.getString("soberDays");

    constructor(private routerExtension: RouterExtensions, private http: Http, private route: ActivatedRoute) { }

    onLogout() {
        // Navigate to login page with clearHistory
        console.log("logout");
    }

    ngOnInit(): void {
        this.checkMeditation();

    }


    checkMeditation() {
        this.lastMeditationCheck = ApplicationSettings.getNumber("lastMeditationCheck");
        this.timeNow = Math.floor((new Date).getTime()/1000);

            if ((this.timeNow - this.lastMeditationCheck) > 3600 ) {
                alert("inner");
                ApplicationSettings.setNumber("lastMeditationCheck", this.timeNow );
                //update meditation
                this.updateMeditation();

            } else if (!this.lastMeditationCheck) {
                this.updateMeditation();
            }

    }

    updateMeditation() {

        this.jwt = ApplicationSettings.getString("jwt");


        let headers = new Headers({ "Authorization": "Basic " + this.jwt,
                                    "email": ApplicationSettings.getString("username") });
        let options = new RequestOptions({ headers: headers });
        this.http.get("https://rod.kellyhiggins.co:3001/meditation", options)
            .map(result => result.json())
            .subscribe(result => {

                this.meditation = result.dailyMeditation;
                
                if (this.meditation != ApplicationSettings.getString("meditation") ) {
                    ApplicationSettings.setString("meditation", this.meditation);
                    this.routerExtension.navigate(["../tabs/default"], { clearHistory: true });
                } else {

                }
            }, error => {
                (new SnackBar()).simple(error.json().message)
            });

    }


}