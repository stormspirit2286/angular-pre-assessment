import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: FormComponent,
    children: [
      {path: '', redirectTo: 'builder', pathMatch: 'full'},
      {
        path: 'builder',
        loadChildren: () => import('../form-builder/form-builder.module').then(m => m.FormBuilderModule)
      },
      {
        path: 'answer',
        loadChildren: () => import('../form-answer/form-answer.module').then(m => m.FormAnswerModule)
      }
    ]
  }
]

@NgModule({
  declarations: [
    FormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class FormModule {
}
