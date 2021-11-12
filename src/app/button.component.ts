import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, VERSION, ViewEncapsulation } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'custom-button-from-server', // TODO
  template: `
      <button (click)="handleClick()">{{label}}</button>
      <div class="risk" *ngIf="risikoErkannt">Risiko erkannt!</div>
  `,
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom // TODO
})
export class ButtonComponent implements OnInit, OnChanges {

  @Input() label = "Klick mich um ein Event ans FE zu triggern"
  @Input() url = ""
  // @Output() clicked = new EventEmitter<string>() // -> angular output event is not bubbling

  risikoErkannt = false;
  risikoResponse: any;
  firstRender = true;

  constructor(private _dataService: DataService, private elementRef: ElementRef) { }

  ngOnInit(): void {

    console.log(VERSION.full)

    this.loadData(this.url)
    this.firstRender = false
  }

  /**
   * TODO
   * Check for changes
   * @param changes 
   * @returns 
   */
  ngOnChanges(changes: SimpleChanges) {
    if (this.firstRender) return; // method also runs on init, so on first render ignore

    if (changes.url) this.loadData(this.url)
  }

  loadData(url: string) {
    if (this.url) {
      this._dataService.fetchData(url).subscribe((data: any) => {
        this.risikoErkannt = data.risikoErkannt;
        this.risikoResponse = data;
        console.log(data)
      })
    }
  }

  /**
   * TODO
   * not an angular event, bc angular events do not bubble when converting to a CE
   */
  handleClick = () => {
    const event = new CustomEvent('clicked', {detail: this.risikoResponse, bubbles: true})
    this.elementRef.nativeElement.dispatchEvent(event)
  }
}
