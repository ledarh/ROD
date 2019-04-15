import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { BigbookComponent } from "./bigbook.component";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { BigbookbodyComponent } from "./bigbookbody/bigbookbody.component";
import { BigbookroutingModule } from "../bigbook/bigbook-routing.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        BigbookroutingModule
    ],
    declarations: [
        BigbookComponent,
        BigbookbodyComponent
    ],
    providers: [
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class BigbookModule { }
