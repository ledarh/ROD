import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { MeetingHandlerComponent } from "./meeting-handler.component";
import { NativeScriptCommonModule } from "nativescript-angular/common";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forChild([
            { path: "", redirectTo: "meetingHandler" },
            { path: "meetingHandler", component: MeetingHandlerComponent }
        ])
    ],
    declarations: [
        MeetingHandlerComponent
    ],
    providers: [
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class MeetingHandlerModule { }
