import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Publisher} from './model/publisher';
import {PublishersComponent} from './components/publishers/publishers.component';

const routes: Routes = [
  {path: 'publishers', component: PublishersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
