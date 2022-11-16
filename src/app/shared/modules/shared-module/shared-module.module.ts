import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfinityScrollDirective } from '@app/shared/directives/infinity-scroll.directive';



@NgModule({
  declarations: [InfinityScrollDirective],
  imports: [
    CommonModule
  ],
  exports: [InfinityScrollDirective]
})
export class SharedModuleModule { }
