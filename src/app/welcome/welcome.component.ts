import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Http, Headers, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import * as ApplicationSettings from "application-settings";
import { SnackBar } from "nativescript-snackbar";
import { DatePicker } from "tns-core-modules/ui/date-picker";
import 'rxjs/add/operator/map';

let fellowshipList = ["Alcoholics Anonymous", "Narcotics Anonymous", "Al Anon"];

@Component({
    moduleId: module.id,
    selector: "welcome-page",
    templateUrl: "./welcome.component.html",
    styleUrls: ["./welcome-common.css"]
})
export class WelcomeComponent implements OnInit {

    public fellowshipOptions: Array<string> = [];
    public name: string;
    public isAA: boolean;
    public jwt: string;
    public soberDays: number;
    public formtoggler = "collapse";
    public loadtoggler = "visible";

    constructor(private routerExtension: RouterExtensions, private http: Http, private route: Router) {

        for (let fellowship of fellowshipList) {
            this.fellowshipOptions.push(fellowship);
        }

    };


    onPickerLoaded(args) {
        let datePicker = <DatePicker>args.object;
        datePicker.year = 1980;
        datePicker.month = 2;
        datePicker.day = 9;
        datePicker.minDate = new Date(1975, 0, 29);
        datePicker.maxDate = new Date(2045, 4, 12);
    }


    onLogout() {
        // Navigate to login page with clearHistory
        this.routerExtension.navigate(["../login"], { clearHistory: true });
    }

    ngOnInit() {
        this.jwt = ApplicationSettings.getString("jwt");


        let headers = new Headers({ "Authorization": "Basic " + this.jwt,
                                    "email": ApplicationSettings.getString("username") });
        let options = new RequestOptions({ headers: headers });
        this.http.get("https://rod.kellyhiggins.co:3001/protected", options)
            .map(result => result.json())
            .subscribe(result => {
                if (result.firstrun != 1 ) {
                    //get user settings & populate fields
                    ApplicationSettings.setString("name", result.name );
                    ApplicationSettings.setString("linitial", result.linitial );
                    ApplicationSettings.setNumber("fellowship", result.fellowship );
                    ApplicationSettings.setString("soberDate", result.soberDate );
                    ApplicationSettings.setString("meetings", result.meetings );

                    var date = new Date(ApplicationSettings.getString("soberDate")+"T12:01:04.753Z");

                    this.setSoberDays(date);

                    this.routerExtension.navigate(["../tabs/default"], { clearHistory: true });
                } else {
                    this.loadtoggler = "collapse";
                    this.formtoggler = "visible";
                }
            }, error => {
                (new SnackBar()).simple(error.json().message)
            });

    }

    navToHome() {
        this.routerExtension.navigate(["../tabs/default"], { clearHistory: true });
    }

    setSoberDays( date: Date ) {
        var diff = Math.abs(Date.now() - date.getTime());
        this.soberDays = Math.ceil(diff / (1000 * 3600 * 24)); 

        ApplicationSettings.setString("soberDays", this.soberDays.toString());
    }
}
