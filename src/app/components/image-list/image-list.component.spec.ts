/**
 * Image Viewer - Image List Component - Spec
 *
 * @since       2019.07.24
 * @version     1.0.0.0
 * @author		  mlbors
 * @copyright	  -
 */

/*****************************/
/********** IMPORTS **********/
/*****************************/

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule} from '@angular/router/testing';

import { Observable } from 'rxjs';

import { ImageListComponent } from './image-list.component';
import { ImageService } from '../../services/image.service';
import { IImageService } from '../../interfaces/iimage-service';

/********************************************************************************/
/********************************************************************************/

/****************************/
/********** SET UP **********/
/****************************/

describe('ImageListComponent', () => {

  /*******************************/
  /********** ATTRIBUTS **********/
  /*******************************/

  /**
   * @param ImageListComponent component component to test
   * @param ComponentFixture fixture fixture to use for tests
   * @param Spy httpClientSpy spy on HTTP Client
   * @param HttpClient httpClient HTTP Client object
   * @param HttpTestingController httpTestingController mock controller for HTTP request
   */

  let component: ImageListComponent;
  let fixture: ComponentFixture<ImageListComponent>;
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
      declarations: [
        ImageListComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: ImageService, useClass: ImageService }
      ]
    })
    .compileComponents();

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  /********************************************************************************/
  /********************************************************************************/

  /*********************************/
  /********** BEFORE EACH **********/
  /*********************************/

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /********************************************************************************/
  /********************************************************************************/

  /**************************************/
  /********** CREATE COMPONENT **********/
  /**************************************/

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
