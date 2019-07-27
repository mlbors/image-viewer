/**
 * Image Viewer - App - Spec
 *
 * @since       2019.07.24
 * @version     1.0.0.0
 * @author		  mlbors
 * @copyright	  -
 */

/*****************************/
/********** IMPORTS **********/
/*****************************/

import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

/********************************************************************************/
/********************************************************************************/

/****************************/
/********** SET UP **********/
/****************************/

describe('AppComponent', () => {

  /********************************************************************************/
  /********************************************************************************/

  /***************************************/
  /********** BEFORE EACH ASYNC **********/
  /***************************************/

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  /********************************************************************************/
  /********************************************************************************/

  /********************************/
  /********** CREATE APP **********/
  /********************************/

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  /********************************************************************************/
  /********************************************************************************/

  /********************************/
  /********** TEST TITLE **********/
  /********************************/

  it(`should have as title 'image-viewer'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('image-viewer');
  });

  /********************************************************************************/
  /********************************************************************************/

  /*****************************/
  /********** TEST H1 **********/
  /*****************************/

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to image-viewer!');
  });
});
