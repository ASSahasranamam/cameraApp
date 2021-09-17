import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponentComponent } from './form-component/form-component.component'
import { ViewAllComponent } from './view-all/view-all.component';
const routes: Routes = [
  { path: '', redirectTo: '/formComp', pathMatch: 'full' },
  { path: 'formComp', component: FormComponentComponent },
  { path: 'table', component: ViewAllComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
