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

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';

import { AppComponent } from './app.component';

import { ImageListComponent } from './components/image-list/image-list.component';

/********************************************************************************/
/********************************************************************************/

/****************************/
/********** SET UP **********/
/****************************/

describe('AppComponent', () => {

  /*******************************/
  /********** ATTRIBUTS **********/
  /*******************************/

  /**
   * @param Spy httpClientSpy spy on HTTP Client
   * @param HttpClient httpClient HTTP Client object
   * @param HttpTestingController httpTestingController mock controller for HTTP request
   */

  let httpClientSpy: { get: jasmine.Spy };
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  /********************************************************************************/
  /********************************************************************************/

  /***************************************/
  /********** BEFORE EACH ASYNC **********/
  /***************************************/

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        ImageListComponent
      ],
    }).compileComponents();

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
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
