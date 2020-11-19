import { ChangeDetectorRef, Component, Injector } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EntityPage } from 'src/app/common/entity-page';
import { RouterLinks } from 'src/app/common/router-links';
import { RoutingService } from 'src/app/common/routing.service';
import { Attachment } from 'src/app/model/attachment';
import { Hero } from 'src/app/model/hero';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { HeroService } from 'src/app/services/hero.service';

@Component({
	templateUrl: 'hero.component.html'
})
export class HeroComponent extends EntityPage<Hero> {

	shownPicture: string;

	private get pictureControl(): AbstractControl {
		return this.form.get('picture');
	}

	constructor(injector: Injector,
				protected routingService: RoutingService,
				protected formBuilder: FormBuilder,
				protected heroService: HeroService,
				protected fileUploadService: FileUploadService,
				protected cdRef: ChangeDetectorRef) {
		super(injector, RouterLinks.NewHero, 'heroId', 'hero', 'hero');
	}

	protected getEntity(): Observable<Hero> {
		return this.heroService.getHero(this.entityId);
	}

	protected saveEntity(): Observable<Hero> {
		const heroToSave: Hero = this.getHeroFromForm();
		return new Observable<Hero>(resolve => {
			const pictureObservable: Observable<Attachment> = this.pictureControl.value ?
				this.fileUploadService.uploadFile(this.pictureControl.value, this.shownPicture)
				: of(heroToSave.picture);

			pictureObservable.subscribe((attachment: Attachment) => {
				heroToSave.picture = attachment;
				this.heroService.saveHero(heroToSave)
					.subscribe(hero => {
						this.routingService.navigateToHero(hero, true);
						resolve.next(hero);
						resolve.complete();
					});
			});
		});
	}

	protected deleteEntity(): Observable<any> {
		return this.heroService.deleteHero(this.entity.id)
			.pipe(tap(() => this.routingService.navigateToHeroes()));
	}

	protected getEntityName(): string {
		return this.entity.name;
	}

	protected buildForm(): void {
		this.form = this.formBuilder.group({
			name: [undefined, Validators.required],
			picture: []
		});
		this.form.disable();

		this.pictureControl.valueChanges.subscribe({
			next: (file: File) => {
				if (file) {
					const reader = new FileReader();
					reader.readAsDataURL(file);
					reader.onload = () => this.shownPicture = reader.result as string;
				}
			}
		});
	}

	protected makeFormValue(hero: Hero): any {
		return {
			name: hero.name,
			picture: null
		};
	}

	protected navigateToEntityListPage(): Promise<any> {
		return this.routingService.navigateToHeroes();
	}

	// Override
	protected setEntity(hero: Hero): void {
		super.setEntity(hero);
		this.shownPicture = hero.picture ? hero.picture.url : null;
	}

	private getHeroFromForm(): Hero {
		const formValue = this.form.getRawValue();
		return {
			...this.entity,
			name: formValue.name,
			picture: this.entity.picture
		};
	}
}
