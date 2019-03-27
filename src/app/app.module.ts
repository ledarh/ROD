import { NgModule, NO_ERRORS_SCHEMA, ErrorHandler, NgModuleFactoryLoader } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule, COMPONENTS } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { DataService } from "./data.service";
import { NSModuleFactoryLoader } from "nativescript-angular/router";

import { enable as traceEnable, addCategories } from "tns-core-modules/trace";

import { registerElement } from 'nativescript-angular/element-registry';
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { WelcomeComponent } from "./welcome/welcome.component";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import 'rxjs/add/operator/map';
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { AccordionModule } from 'nativescript-accordion/angular';
registerElement('AnimatedCircle', () => require('nativescript-animated-circle').AnimatedCircle);

//maps
import * as platform from "platform";
declare var GMSServices: any;

traceEnable();

export class MyErrorHandler implements ErrorHandler {
    handleError(error) {
        console.log("### ErrorHandler Error: " + error.toString());
        console.log("### ErrorHandler Stack: " + error.stack);
    }
}

//maps
if (platform.isIOS) { 
    GMSServices.provideAPIKey("AIzaSyBUmB5-8_Uvm3Ai7GIuoEzi9CZzasDbVKY");
  }


@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptFormsModule,
        NativeScriptHttpModule,
        NativeScriptUIListViewModule,
        AccordionModule
    ],
    declarations: [
        AppComponent,
        WelcomeComponent,
        ...COMPONENTS
    ],
    providers: [
        DataService,
        { provide: ErrorHandler, useClass: MyErrorHandler },
        { provide: NgModuleFactoryLoader, useClass: NSModuleFactoryLoader }
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule {}