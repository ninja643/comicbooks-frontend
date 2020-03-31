import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'comicbooks-frontend';

}


// TODO

// 1. Da dodam logove, gde je kliknuto i da moze da se prikaze statistika
// 2. da dodam loader
// 3. Ne radi hamburger menu
// 4. Da li treba neka validacija prilikom dodavanja novih stvari (da ne dozvolim dodavanje ako vec postoji)
// 5. Da obradim ako id u url-u nije dobar
// 6. validacija slike prilikom cuvanja comicbook-a