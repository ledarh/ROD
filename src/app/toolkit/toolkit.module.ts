import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { ToolkitComponent } from "./toolkit.component";
import { NativeScriptCommonModule } from "nativescript-angular/common";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forChild([
            { path: "", redirectTo: "toolkit" },
            { path: "toolkit", component: ToolkitComponent }
        ])
    ],
    declarations: [
        ToolkitComponent
    ],
    providers: [
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ToolkitModule { }
