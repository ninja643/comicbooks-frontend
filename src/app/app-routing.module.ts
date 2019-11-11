import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Publisher} from './model/publisher';
import {PublishersComponent} from './components/publishers/publishers.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {PublisherDetailsComponent} from './components/publisher-details/publisher-details.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'publishers', component: PublishersComponent},
  {path: 'publisher-details/:id', component: PublisherDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
