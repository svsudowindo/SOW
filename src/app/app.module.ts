import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { AdminLayoutComponent } from "./shared/components/layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./shared/components/layouts/auth-layout/auth-layout.component";
import { SharedModule } from "./shared/shared.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HeaderInterceptorsService } from "./shared/services/http/header-interceptors.service";

@NgModule({
  declarations: [AppComponent, AuthLayoutComponent, AdminLayoutComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({ animated: false }),
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptorsService, multi: true }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
