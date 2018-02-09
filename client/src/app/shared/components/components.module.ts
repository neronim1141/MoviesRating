import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

// import { PipesModule } from "../pipes";
import { TranslateModule } from "@ngx-translate/core";

// import { SpinnerComponent } from "./spinner/spinner.component";
import { NavigationComponent } from "./navigation/navigation.component";
// import { ProfileActionBarComponent } from "./profileActionBar/profileActionBar.component";
import { HeaderComponent } from "./header/header.component";
import { LanguageSelectorComponent } from "./language-selector/language-selector.component";
import { MaterialModule } from "../modules/material.module";

// import { PageNotFoundComponent } from "./pageNotFound/pageNotFound.component";

export const COMPONENTS = [
  // SpinnerComponent,
  NavigationComponent,
  // ProfileActionBarComponent,
  HeaderComponent,

  LanguageSelectorComponent

  // PageNotFoundComponent
];

@NgModule({
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule,
    MaterialModule
    // PipesModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule {}
