import { Component } from '@angular/core';
import { RouterLinks } from 'src/app/common/router-links';
import { appLogo } from 'src/app/common/constants';

@Component({
	selector: 'navbar',
	styleUrls: ['navbar.component.scss'],
	templateUrl: 'navbar.component.html'
})
export class NavbarComponent {

	logo: string = appLogo;
	routerLinksEnum = RouterLinks;
}
