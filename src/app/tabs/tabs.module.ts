import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptRouterModule, NSEmptyOutletComponent } from "nativescript-angular/router";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { TabsComponent } from "./tabs.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forChild([
            {
                path: "default", component: TabsComponent, children: [
                    
                    {
                        path: "home",
                        outlet: "homeTab",
                        component: NSEmptyOutletComponent,
                        loadChildren: "~/app/home/home.module#HomeModule"
                    },
                    {
                        path: "alert",
                        outlet: "alertTab",
                        component: NSEmptyOutletComponent,
                        loadChildren: "~/app/alert/alert.module#AlertModule",
                    },
                    {
                        path: "toolkit",
                        outlet: "toolkitTab",
                        component: NSEmptyOutletComponent,
                        loadChildren: "~/app/toolkit/toolkit.module#ToolkitModule",
                    },
                    {
                        path: "map",
                        outlet: "mapTab",
                        component: NSEmptyOutletComponent,
                        loadChildren: "~/app/map/map.module#MapModule",
                    }
                ]
            }
        ])
    ],
    declarations: [
        TabsComponent
    ],
    providers: [
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class TabsModule { }