import { Component, ElementRef, ViewChild, OnInit } from "@angular/core";

import { RouterExtensions } from "nativescript-angular/router";
import { Http, Headers, RequestOptions } from "@angular/http";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { SnackBar } from "nativescript-snackbar";
import * as ApplicationSettings from "application-settings";
import { Router } from "@angular/router";
import 'rxjs/add/operator/map';
@Component({
    moduleId: module.id,
    selector: "login-page",
    templateUrl: "login.component.html",
    styleUrls: ["./login-common.css"]
})


export class LoginComponent implements OnInit {

    isLoggingIn = true;
    public input: any;
    url = 'https://kellyhiggins.co/rod/alert.php';
    result: any = "penis";
    constructor(private http: Http, private routerExtension: RouterExtensions, private router: Router) {
        
        this.input = {
            "email": "",
            "password": "",
            "confirmPassword": ""
        }
    };

    ngOnInit() {
    }

    onNavigateWelcome() {
        // Navigate to welcome page with clearHistory
        this.routerExtension.navigate(["../tabs/default"], { clearHistory: true });
    }

    toggleForm() {
        this.isLoggingIn = !this.isLoggingIn;
      }

    submit() {
        if(this.isLoggingIn) {
            //login
            if(this.input.email && this.input.password) {

                
                let headers = new Headers({ "Content-Type": "application/json" });
                let options = new RequestOptions({ headers: headers });
                this.http.post("https://rod.kellyhiggins.co:3001/authenticate", JSON.stringify({ username: this.input.email, password: this.input.password }), options)
                    .map(result => result.json())
                    .subscribe(result => {
                        
                        ApplicationSettings.setString("jwt", result.token );
                        ApplicationSettings.setString("username", result.username );

                        this.router.navigate(["welcome"]);
                        
                    }, error => {
                        (new SnackBar()).simple(error.json().message)
                    });
            } else {
                (new SnackBar()).simple("All Fields Required!");
            }
        } else {
            //sign up
            if(this.input.email && this.input.password && this.input.confirmPassword ) {

                    if( this.input.password == this.input.confirmPassword ) {
                        let headers = new Headers({ "Content-Type": "application/json" });
                        let options = new RequestOptions({ headers: headers });
                        this.http.post("https://rod.kellyhiggins.co:3001/register", JSON.stringify({ username: this.input.email, password: this.input.password }), options)
                            .map(result => result.json())
                            .subscribe(result => {
                                
                                (new SnackBar()).simple(result.message);
                                
                            }, error => {
                                (new SnackBar()).simple(error.json().message)
                            });
                    } else {
                        (new SnackBar()).simple("Passwords don't match");
                    }
            } else {
                (new SnackBar()).simple("All Fields Required!");
            }
        }
    }



    public login(username: string, password: string) {
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });
        this.http.post("http://localhost:3000/authenticate", JSON.stringify({ username: username, password: password }), options)
            .map(result => result.json())
            .subscribe(result => {
                alert(result.token);
            }, error => {
                (new SnackBar()).simple(error.json().message)
            });
    }

}
