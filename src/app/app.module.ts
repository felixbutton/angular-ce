import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonComponent } from './button.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ ButtonComponent ],
  imports: [ BrowserModule, HttpClientModule ],
  providers: [],
  bootstrap: [ButtonComponent] // TODO
})
export class AppModule { 

  // TODO
  constructor(private injector: Injector) {
    const customButtonFromServer = createCustomElement(ButtonComponent, {injector});
    customElements.define('custom-button-from-server', customButtonFromServer);
  }

  ngDoBoostrap() {}
}
