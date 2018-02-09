import { NgModule } from '@angular/core';
import { ComponentsModule } from './components/components.module';
import { ContainersModule } from './containers/containers.module';
import { TruncatePipe } from './pipes/truncate.pipe';
import { RepeatDirective } from './directives/repeat.directive';
import { MaterialModule } from './modules/material.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  exports: [
    ComponentsModule,
    ContainersModule,
    MaterialModule,
    TruncatePipe,
    RepeatDirective,
    TranslateModule
  ]
})
export class SharedModule {}
