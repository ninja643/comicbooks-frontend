import { Component } from '@angular/core';
import { RouterLinks } from 'src/app/common/router-links';

@Component({
    selector: 'navbar',
    styleUrls: ['navbar.component.scss'],
    templateUrl: 'navbar.component.html'
})
export class NavbarComponent {

    // TODO da izvucem u konstantu
    logo: string = 'assets/images/516bea553d41e_thumb900.jpg';

    routerLinksEnum = RouterLinks;


    //TODO na uskom ekranu se ne expanduje navigacija na hamburger menu



}