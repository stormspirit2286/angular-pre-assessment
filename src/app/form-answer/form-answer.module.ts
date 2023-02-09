import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormAnswerComponent } from "./form-answer.component";

const routes: Routes = [
  {
    path: '',
    component: FormAnswerComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class FormAnswerModule {
}
