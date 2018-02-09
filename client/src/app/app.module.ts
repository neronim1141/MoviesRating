import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Routes
import { AppRoutingModule } from './app-routing.module';

// Services
import { ConfigService } from './app-config.service';

// Store: not used in production
import { storeFreeze } from 'ngrx-store-freeze';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Store
import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects, CustomSerializer } from './shared/store';
export const metaReducers: MetaReducer<any>[] = isDevMode()
  ? [storeFreeze]
  : [];

// FalseDatabase
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

// Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
// Third party libraries

import { MaterialModule } from './shared/modules/material.module';

// App modules/components
import { ComponentsModule } from './shared/components/components.module';
import { ContainersModule } from './shared/containers/containers.module';
import { AppSandbox } from './app.sandox';
import { HttpModule } from '@angular/http';

import { AuthModule } from './Auth/auth.module';
import { PageNotFoundComponent } from './Errors/page-not-found/page-not-found.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthService } from './shared/asyncServices/auth.service';
import { LikeService } from './shared/asyncServices/like.service';
import {
  AuthGuardNotLogged,
  AuthGuardIsLogged
} from './Auth/guards/auth.guard';
import { ForbiddenComponent } from './Errors/forbidden/forbidden.component';
import 'hammerjs';

export const devModeModules: any[] = isDevMode()
  ? [StoreDevtoolsModule.instrument()]
  : [];
export function configServiceFactory(config: ConfigService) {
  return () =>
    isDevMode() ? config.load('development') : config.load('production');
}
export const Components = [
  AppComponent,
  PageNotFoundComponent,
  ForbiddenComponent
];
@NgModule({
  declarations: Components,
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ComponentsModule,
    ContainersModule,
    AppRoutingModule,
    FlexLayoutModule,
    HttpClientModule,
    HttpModule,
    AuthModule,

    MaterialModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    ...devModeModules
  ],

  providers: [
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configServiceFactory,
      deps: [ConfigService],
      multi: true
    },
    LikeService,

    AuthGuardNotLogged,
    AuthGuardIsLogged
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
