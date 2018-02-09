import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LayoutComponent } from "./layout/layout.component";
import { MaterialModule } from "../modules/material.module";
import { ComponentsModule } from "../components/components.module";
import { LayoutSandbox } from "./layout/layout.sandbox";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TranslateModule } from "@ngx-translate/core";
const CONTAINERS = [LayoutComponent];
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ComponentsModule,
    TranslateModule,
    FlexLayoutModule
  ],
  declarations: CONTAINERS,
  exports: CONTAINERS,
  providers: [LayoutSandbox]
})
export class ContainersModule {}
