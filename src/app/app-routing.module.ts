import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { BigbookComponent } from './bigbook/bigbook.component';
export const COMPONENTS = [LoginComponent];

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    {
        path: "login", component: LoginComponent
    },
    {
        path: "welcome", component: WelcomeComponent
    },
    {
        path: "tabs",
        loadChildren: "~/app/tabs/tabs.module#TabsModule"
    },
    {
        path: "meetingHandler",
        loadChildren: "~/app/meeting-handler/meeting-handler.module#MeetingHandlerModule",
    },
    {
        path: "bigbook", component: BigbookComponent
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule],
})
export class AppRoutingModule { }
