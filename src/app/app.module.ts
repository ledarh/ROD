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
import { ModalDatetimepicker, PickerOptions } from 'nativescript-modal-datetimepicker';
import 'rxjs/add/operator/map';


registerElement('AnimatedCircle', () => require('nativescript-animated-circle').AnimatedCircle);


traceEnable();

export class MyErrorHandler implements ErrorHandler {
    handleError(error) {
        console.log("### ErrorHandler Error: " + error.toString());
        console.log("### ErrorHandler Stack: " + error.stack);
    }
}

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptFormsModule,
        NativeScriptHttpModule
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