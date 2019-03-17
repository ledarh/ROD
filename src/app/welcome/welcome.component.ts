import { Observable } from 'tns-core-modules/data/observable';
import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Http, Headers, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import * as ApplicationSettings from "application-settings";
import { SnackBar } from "nativescript-snackbar";
import { DatePicker } from "tns-core-modules/ui/date-picker";
import { ModalDatetimepicker, PickerOptions } from 'nativescript-modal-datetimepicker';
import 'rxjs/add/operator/map';

const ModalPicker = require("nativescript-modal-datetimepicker")
  .ModalDatetimepicker;
 
const picker = new ModalPicker();

let fellowshipList = ["Select Fellowship","Alcoholics Anonymous", "Narcotics Anonymous", "Al Anon"];

@Component({
    moduleId: module.id,
    selector: "welcome-page",
    templateUrl: "./welcome.component.html",
    styleUrls: ["./welcome-common.css"]
})
export class WelcomeComponent extends Observable implements OnInit {

    public fellowshipOptions: Array<string> = [];
    public fellowshipNum: number;
    public name: string;
    public isAA: boolean;
    public jwt: string;
    public soberDays: number;
    public formtoggler = "collapse";
    public loadtoggler = "visible";
    public input: any;
    public date: string;
    private modalDatetimepicker: ModalDatetimepicker;
    public day = "1";
    public month = "1";
    public year = "2019";
    public soberDateConcat: String;
    constructor(private routerExtension: RouterExtensions, private http: Http, private route: Router ) {
        super();
        for (let fellowship of fellowshipList) {
            this.fellowshipOptions.push(fellowship);
        }

        this.input = {
            "name": "",
            "linitial": "",
            "fellowship": "",
            "soberDate": ""
        }
        this.modalDatetimepicker = new ModalDatetimepicker();
    };



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

                    this.writeToAppSettings(result);
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


    submit() {
        if(this.input.name && this.input.linitial && (this.input.fellowship != "Select Fellowship") ) {

            this.jwt = ApplicationSettings.getString("jwt");
            this.soberDateConcat = this.year.toString() + "-" + this.month.toString() + "-" + this.day.toString();
            let headers = new Headers({ "Authorization": "Basic " + this.jwt,
                                        "Content-Type": "application/json" });
            let options = new RequestOptions({ headers: headers });
            this.http.post("https://rod.kellyhiggins.co:3001/registerSettings", JSON.stringify({ username: ApplicationSettings.getString("username"), 
            name: this.input.name, soberDate: this.soberDateConcat, linitial: this.input.linitial, fellowship: this.input.fellowship }), options)
                .map(result => result.json())
                .subscribe(result => {
                    
                    if(result.message == "done") {
                        this.writeToAppSettings(result);
                        this.routerExtension.navigate(["../tabs/default"], { clearHistory: true });
                    }
                    
                }, error => {
                    (new SnackBar()).simple(error.json().message)
                });
        } else {
            (new SnackBar()).simple("All Fields Required");
        }
    }


    selectDate() {
        this.modalDatetimepicker.pickDate(<PickerOptions>{
            title: "Configurable Title",
            theme: "light",
            startingDate: new Date('2018-11-17'),
            maxDate: new Date(),
            minDate: new Date('1950-01-01')
        }).then((result:any) => {
            if (result) {
                this.day = result.day;
                this.month = result.month;
                this.year = result.year;
            } else {
                
            }
        })
        .catch((error) => {
            console.log("Error: " + error);
        });
    };


    writeToAppSettings(result: any) {
        //get user settings & populate fields
        ApplicationSettings.setString("name", result.name );
        ApplicationSettings.setString("linitial", result.linitial );
        ApplicationSettings.setNumber("fellowship", result.fellowship );
        ApplicationSettings.setString("soberDate", result.soberDate );
        ApplicationSettings.setString("meetings", result.meetings );

        var date = new Date(ApplicationSettings.getString("soberDate"));
        this.setSoberDays(date);
    }


}
