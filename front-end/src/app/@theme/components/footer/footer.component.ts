import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Created by <b><a href="https://www.istat.it" target="_blank">ISTAT</a></b> 2024
    </span>
    <span class="created-by">All data are released under CC-BY 4.0 license</span>
    <div class="socials">
      <a href="https://github.com/IstatCooperation" target="_blank" class="ion ion-social-github"></a>
    </div>
  `,
})
export class FooterComponent {
}
