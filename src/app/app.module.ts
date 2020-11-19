import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ComicbooksHttpClient } from './services/comicbooks-http-client';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { PublishersComponent } from './components/publishers/publishers.component';
import { ComicbooksComponent } from './components/comicbooks/comicbooks.component';
import { ComicbookComponent } from './components/comicbook/comicbook.component';
import { HeroComponent } from './components/hero/hero.component';
import { PublisherComponent } from './components/publisher/publisher.component';
import { CustomTableComponent } from './components/table/custom-table.component';
import { ContentTemplateDirective } from './components/table/content-template.directive';
import { HeaderTemplateDirective } from './components/table/header-template.directive';
import { ExecutePipe } from './common/execute.pipe';
import { LoaderComponent } from './components/loader/loader.component';
import { BackgroundImageDirective } from './common/background-image.directive';
import { DropdownSelectComponent } from './components/dropdown-select/dropdown-select.component';
import { NgbModalModule, NgbPaginationModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { FileInputComponent } from './components/file-input/file-input.component';
import { InformationPopupComponent } from './components/popups/information/information-popup.component';
import { ConfirmationPopupComponent } from './components/popups/confirmation/confirmation-popup.component';
import { HttpErrorInterceptor } from './services/http-error.interceptor';
import { ItemTemplateDirective } from './components/search-page/item-template.directive';
import { SearchPageComponent } from './components/search-page/search-page.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		NavbarComponent,
		ComicbooksComponent,
		ComicbookComponent,
		HeroesComponent,
		HeroComponent,
		PublishersComponent,
		PublisherComponent,
		CustomTableComponent,
		HeaderTemplateDirective,
		ContentTemplateDirective,
		ExecutePipe,
		LoaderComponent,
		BackgroundImageDirective,
		DropdownSelectComponent,
		FileInputComponent,
		InformationPopupComponent,
		ConfirmationPopupComponent,
		ItemTemplateDirective,
		SearchPageComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		AppRoutingModule,
		HttpClientModule,
		NgbPaginationModule,
		NgbModalModule,
		NgbPopoverModule
	],
	entryComponents: [
		InformationPopupComponent,
		ConfirmationPopupComponent
	],
	providers: [
		ComicbooksHttpClient,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpErrorInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
