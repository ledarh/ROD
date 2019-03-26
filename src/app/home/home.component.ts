import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Http, Headers, RequestOptions } from "@angular/http";
import { ActivatedRoute } from "@angular/router";
import {TextView} from "tns-core-modules/ui/text-view";
import * as ApplicationSettings from "application-settings";
import { SnackBar } from "nativescript-snackbar";
import "rxjs";
import { EventData } from 'data/observable';
import { RadListView, ListViewEventData } from "nativescript-ui-listview";
import { View } from 'ui/core/view';
import { isIOS, isAndroid } from "platform";
import * as utils from "utils/utils";
declare var UIView, NSMutableArray, NSIndexPath;



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
    private dataItems: any[];
    private dataItems2: any[];
    public items: any[];
    public selectedIndexes = [0, 0];
    soberDaysNum: String = ApplicationSettings.getString("soberDays");

    constructor(private routerExtension: RouterExtensions, private http: Http, private route: ActivatedRoute) { }


    onLogout() {
        // Navigate to login page with clearHistory
        console.log("logout");
    }



    ngOnInit(): void {
        this.checkMeditation();
        this.dataItems = [];
        let itemsCount = 50;
        for (var i = 1; i <= itemsCount; i++) {
            this.dataItems.push({
                name: "Test " + i,
                expanded: false
            });
        }

        this.items = [
            {
                title: 'Monday',
                expanded: false,
                footer: '10',
                headerText: 'First',
                footerText: '',
                image: '../tabs/default',
                items: [{
                    text: 'Drop'
                }]
            },
            {
                title: 'Tuesday',
                expanded: false,
                footer: '20',
                headerText: 'Second',
                footerText: '',
                image: 'http://placehold.it/120x120&text=Second',
                items: [{
                    text: 'Drop'
                }]
            },
            {
                title: 'Wednesday',
                expanded: false,
                footer: '30',
                headerText: 'Third',
                footerText: '',
                image: 'http://placehold.it/120x120&text=Third',
                items: [{
                    text: 'Drop'
                }]
            },
            {
                title: 'Thursday',
                expanded: false,
                footer: '30',
                headerText: 'Third',
                footerText: '',
                image: 'http://placehold.it/120x120&text=Third',
                items: [{
                    text: 'Drop'
                }]
            },
            {
                title: 'Friday',
                expanded: false,
                footer: '30',
                headerText: 'Third',
                footerText: '',
                image: 'http://placehold.it/120x120&text=Third',
                items: [{
                    text: 'Drop'
                }]
            },
            {
                title: 'Saturday',
                expanded: false,
                footer: '30',
                headerText: 'Third',
                footerText: '',
                image: 'http://placehold.it/120x120&text=Third',
                items: [{
                    text: 'Drop'
                }]
            },
            {
                title: 'Sunday',
                expanded: false,
                footer: '30',
                headerText: 'Third',
                footerText: '',
                image: 'http://placehold.it/120x120&text=Third',
                items: [{
                    text: 'Drop'
                }]
            }
        ];

    }


    templateSelector(item: any, index: number, items: any): string {
        return item.expanded ? "expanded" : "default";
    }


    checkMeditation() {
        this.lastMeditationCheck = ApplicationSettings.getNumber("lastMeditationCheck");
        this.timeNow = Math.floor((new Date).getTime()/1000);

            if ((this.timeNow - this.lastMeditationCheck) > 3600 ) {
                alert("meditation updated");
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

    meetingTap(select) {
        console.log(select);
    }
}