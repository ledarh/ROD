import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { BigbookComponent } from "./bigbook.component";
import { BigbookbodyComponent } from "./bigbookbody/bigbookbody.component";

const routes: Routes = [
    { path: "", redirectTo: "bigbook" },
    { path: "bigbook", component: BigbookComponent },
    { path: "item/:id", component: BigbookbodyComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class BigbookroutingModule { }