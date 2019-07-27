/**
 * Image Viewer - Image Service - Spec
 *
 * @since       2019.07.24
 * @version     1.0.0.0
 * @author		  mlbors
 * @copyright	  -
 */

/*****************************/
/********** IMPORTS **********/
/*****************************/

import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ImageService } from './image.service';
import { IImageType } from '../interfaces/iimage-type';

import { BasicImageMock } from '../../assets/data/mock/image-type/basic-image-mock';
import { LocalImageMock } from '../../assets/data/mock/image-type/local-image-mock';
import { RemoteImageMock } from '../../assets/data/mock/image-type/remote-image-mock';
import { NoPathImageMock } from '../../assets/data/mock/image-type/no-path-image-mock';
import { NoPathNoUrlImageMock } from '../../assets/data/mock/image-type/no-path-no-url-image-mock';
import { NoUrlImageMock } from '../../assets/data/mock/image-type/no-url-image-mock';

/********************************************************************************/
/********************************************************************************/

/****************************/
/********** SET UP **********/
/****************************/

describe('ImageService', () => {

  /********************************************************************************/
  /********************************************************************************/

  /*******************************/
  /********** ATTRIBUTS **********/
  /*******************************/

  /**
   * @param IImageType basicImageMock basic image object
   * @param IImageType localImageMock only local image object
   * @param IImageType remoteImageMock only remote image object
   * @param IImageType noPathImageMock image object that returns no path
   * @param IImageType noPathNoUrlImageMock image object that returns no path and no url
   * @param IImageType noUrlImageMock only image object that returns no url
   * @param Array basicImageArrayMock basic array of image objects
   * @param Spy httpClientSpy spy on HTTP Client
   * @param HttpClient httpClient HTTP Client object
   * @param HttpTestingController httpTestingController mock controller for HTTP request
   */

  const basicImageMock = BasicImageMock;
  const localImageMock = LocalImageMock;
  const remoteImageMock = RemoteImageMock;
  const noPathImageMock = NoPathImageMock;
  const noPathNoUrlImageMock = NoPathNoUrlImageMock;
  const noUrlImageMock = NoUrlImageMock;
  const basicImageArrayMock = [basicImageMock, remoteImageMock, localImageMock];

  let httpClientSpy: { get: jasmine.Spy };
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  /********************************************************************************/
  /********************************************************************************/

  /*********************************/
  /********** BEFORE EACH **********/
  /*********************************/

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  /********************************************************************************/
  /********************************************************************************/

  /********************************/
  /********** AFTER EACH **********/
  /********************************/

  afterEach(() => {
    httpTestingController.verify();
  });

  /********************************************************************************/
  /********************************************************************************/

  /************************************/
  /********** CREATE SERVICE **********/
  /************************************/

  it('should be created', () => {
    const service: ImageService = TestBed.get(ImageService);
    expect(service).toBeTruthy();
  });

  /********************************************************************************/
  /********************************************************************************/

  /*****************************************************************/
  /********** PARSE FEED - RETURNED VALUE - NO PATHTOJSON **********/
  /*****************************************************************/

  it('should return null when parseFeed is called pathToJson values', (done) => {
    const service: ImageService = TestBed.get(ImageService);
    service.parseFeed().subscribe(result => {
      expect(result).toBeNull();
      done();
    });
  });

  /********************************************************************************/
  /********************************************************************************/

  /*************************************************************************/
  /********** PARSE FEED - RETURNED VALUE - NO IMAGES KEY IN FEED **********/
  /*************************************************************************/

  it('should return null when parseFeed is called and feed as no images key', (done) => {
    const service: ImageService = TestBed.get(ImageService);
    service.localEndPoint = '../../assets/data/mock/image/';
    service.pathToJson = '../../assets/data/mock/json/feed-without-images-array.json';
    service.parseFeed().subscribe(result => {
      expect(result).toBeNull();
      done();
    });
  });

  /********************************************************************************/
  /********************************************************************************/

  /*************************************************************/
  /********** PARSE FEED - RETURNED VALUE - MAIN CALL **********/
  /*************************************************************/

  it('should return an array when parseFeed is called',  () => {
    const service: ImageService = TestBed.get(ImageService);
    service.localEndPoint = '../../assets/data/mock/image/';
    service.pathToJson = '../../assets/data/mock/json/main-feed-mock.json';
    service.parseFeed().subscribe(result => {
      expect(result).not.toBeNull();
      expect(result instanceof Array).toBeTruthy();
      expect(result.length > 0).toBeTruthy();
      expect(service.feed).not.toBeNull();
      expect(service.feed instanceof Array).toBeTruthy();
      expect(service.feed.length > 0).toBeTruthy();
    });

    httpTestingController.expectOne(service.pathToJson).flush(basicImageArrayMock, { status: 200, statusText: 'Ok' });
    httpTestingController.verify();
  }, 10000);

  /********************************************************************************/
  /********************************************************************************/

  /***************************************************************************/
  /********** GET ALL IMAGES - RETURNED VALUE - FEED ALREADY PARSED **********/
  /***************************************************************************/

  it('should return an array when getAllImages is called and feed was already parsed', (done) => {
    const service: ImageService = TestBed.get(ImageService);
    service.feed = [basicImageMock, remoteImageMock, localImageMock];
    service.getAllImages().subscribe(result => {
      expect(result).not.toBeNull();
      expect(result instanceof Array).toBeTruthy();
      expect(result.length > 0).toBeTruthy();
      done();
    });
  });

  /********************************************************************************/
  /********************************************************************************/

  /***********************************************************************/
  /********** GET ALL IMAGES - RETURNED VALUE - FEED NOT PARSED **********/
  /***********************************************************************/

  it('should return an array when getAllImages is called and was not already parsed', (done) => {
    const service: ImageService = TestBed.get(ImageService);
    service.feed = [];
    service.localEndPoint = '../../assets/data/mock/image/';
    service.pathToJson = '../../assets/data/mock/json/main-feed-mock.json';
    service.getAllImages().subscribe(result => {
      expect(result).not.toBeNull();
      expect(result instanceof Array).toBeTruthy();
      expect(result.length > 0).toBeTruthy();
      done();
    });
  }, 10000);

  /********************************************************************************/
  /********************************************************************************/

  /*********************************************************************************************/
  /********** GET ALL IMAGES IN SHUFFLED ORDER - RETURNED VALUE - FEED ALREADY PARSED **********/
  /*********************************************************************************************/

  it('should return an array when getAllImagesInShuffledOrder is called and feed was already parsed', (done) => {
    const service: ImageService = TestBed.get(ImageService);
    service.feed = [basicImageMock, remoteImageMock, localImageMock];
    service.getAllImagesInShuffledOrder().subscribe(result => {
      expect(result).not.toBeNull();
      expect(result instanceof Array).toBeTruthy();
      expect(result.length > 0).toBeTruthy();
      expect(result.length === 3).toBeTruthy();
      expect(service.shuffledFeed).not.toBeNull();
      expect(service.shuffledFeed instanceof Array).toBeTruthy();
      expect(service.shuffledFeed.length > 0).toBeTruthy();
      expect(service.shuffledFeed.length === 3).toBeTruthy();
      done();
    });
  });

  /********************************************************************************/
  /********************************************************************************/

  /*****************************************************************************************/
  /********** GET ALL IMAGES IN SHUFFLED ORDER - RETURNED VALUE - FEED NOT PARSED **********/
  /*****************************************************************************************/

  it('should return an array when getAllImagesInShuffledOrder is called and was not already parsed', (done) => {
    const service: ImageService = TestBed.get(ImageService);
    service.feed = [];
    service.localEndPoint = '../../assets/data/mock/image/';
    service.pathToJson = '../../assets/data/mock/json/main-feed-mock.json';
    service.getAllImagesInShuffledOrder().subscribe(result => {
      expect(result).not.toBeNull();
      expect(result instanceof Array).toBeTruthy();
      expect(result.length > 0).toBeTruthy();
      expect(service.shuffledFeed).not.toBeNull();
      expect(service.shuffledFeed instanceof Array).toBeTruthy();
      expect(service.shuffledFeed.length > 0).toBeTruthy();
      done();
    });
  }, 10000);

  /********************************************************************************/
  /********************************************************************************/

  /*****************************************************************************/
  /********** GET RANDOM IMAGE - RETURNED VALUE - FEED ALREADY PARSED **********/
  /*****************************************************************************/

  it('should return an image object when getRandomImage is called and feed was already parsed', (done) => {
    const service: ImageService = TestBed.get(ImageService);
    service.feed = [basicImageMock, remoteImageMock, localImageMock];
    service.localEndPoint = '../../assets/data/mock/image/';
    service.pathToJson = '../../assets/data/mock/json/main-feed-mock.json';
    service.getRandomImage().subscribe(result => {
      expect(result).not.toBeNull();
      expect(result instanceof Image).toBeTruthy();
      done();
    });
  });

  /********************************************************************************/
  /********************************************************************************/

  /*************************************************************************/
  /********** GET RANDOM IMAGE - RETURNED VALUE - FEED NOT PARSED **********/
  /*************************************************************************/

  it('should return an image object when getRandomImage is called and feed was not already parsed', (done) => {
    const service: ImageService = TestBed.get(ImageService);
    service.feed = [];
    service.localEndPoint = '../../assets/data/mock/image/';
    service.pathToJson = '../../assets/data/mock/json/main-feed-mock.json';
    service.getRandomImage().subscribe(result => {
      expect(result).not.toBeNull();
      expect(result instanceof Image).toBeTruthy();
      done();
    });
  }, 10000);

  /********************************************************************************/
  /********************************************************************************/

  /************************************************************/
  /********** GET IMAGE - RETURNED VALUE - MAIN CALL **********/
  /************************************************************/

  it('should return an image object when getImage is called', (done) => {
    const service: ImageService = TestBed.get(ImageService);
    service.localEndPoint = '../../assets/data/mock/image/';
    service.pathToJson = 'fooPathToJson';

    service.getImage(basicImageMock).subscribe(result => {
      expect(result).toBeTruthy();
      expect(result).not.toBeNull();
      expect(result instanceof Image).toBeTruthy();
      console.log(result);
      done();
    });

  }, 10000);

  /********************************************************************************/
  /********************************************************************************/

  /**************************************************************/
  /********** GET IMAGE - RETURNED VALUE - NULL OBJECT **********/
  /**************************************************************/

  it('should return null when getImage is called with a null object', (done) => {
    const service: ImageService = TestBed.get(ImageService);
    service.localEndPoint = 'fooLocalEndPoint';
    service.pathToJson = 'fooPathToJson';

    service.getImage(null).subscribe(result => {
      expect(result).toBeNull();
      done();
    });

  });

  /********************************************************************************/
  /********************************************************************************/

  /*************************************************************************************/
  /********** GET IMAGE - RETURNED VALUE - NO LOCALENDPOINT AND NO PATHTOJSON **********/
  /*************************************************************************************/

  it('should return null when getImage is called without localEndPoint or pathToJson values', (done) => {
    const service: ImageService = TestBed.get(ImageService);
    service.getImage(basicImageMock).subscribe(result => {
      expect(result).toBeNull();
      done();
    });
  });

  /********************************************************************************/
  /********************************************************************************/

  /***************************************************************************/
  /********** TRY TO GET LOCAL IMAGE - RETURNED VALUE - NULL OBJECT **********/
  /***************************************************************************/

  it('should return null when tryToGetLocalImage is called with a null object', (done) => {
    const service: ImageService = TestBed.get(ImageService);

    service.tryToGetLocalImage(null).subscribe(result => {
      expect(result).toBeNull();
      done();
    });
  });

  /********************************************************************************/
  /********************************************************************************/

  /*****************************************************************************************/
  /********** TRY TO GET LOCAL IMAGE - RETURNED VALUE - OBJECT THAT GIVES NO PATH **********/
  /*****************************************************************************************/

  it('should return null when tryToGetLocalImage is called with a object that gives no path', (done) => {
    const service: ImageService = TestBed.get(ImageService);
    service.localEndPoint = null;
    service.tryToGetLocalImage(noPathImageMock).subscribe(result => {
      expect(result).toBeNull();
      done();
    });
  });

  /********************************************************************************/
  /********************************************************************************/

  /*************************************************************************/
  /********** TRY TO GET LOCAL IMAGE - RETURNED VALUE - MAIN CALL **********/
  /*************************************************************************/

  it('should return an object when tryToGetLocalImage is called and response status is equal to 200', (done) => {
    const service: ImageService = TestBed.get(ImageService);

    service.tryToGetLocalImage(basicImageMock).subscribe(result => {
      expect(result).toBeTruthy();
      expect(result).not.toBeNull();
      done();
    });
  }, 10000);

  /********************************************************************************/
  /********************************************************************************/

  /****************************************************************************/
  /********** TRY TO GET REMOTE IMAGE - RETURNED VALUE - NULL OBJECT **********/
  /****************************************************************************/

  it('should return null when tryToGetRemoteImage is called with a null object', (done) => {
    const service: ImageService = TestBed.get(ImageService);
    service.tryToGetRemoteImage(null).subscribe(result => {
      expect(result).toBeNull();
      done();
    });
  });

  /********************************************************************************/
  /********************************************************************************/

  /***********************************************************************************/
  /********** TRY TO GET REMOTE IMAGE - RETURNED VALUE - OBJECT WITHOUT URL **********/
  /***********************************************************************************/

  it('should return null when tryToGetRemoteImage is called with an object without url', (done) => {
    const service: ImageService = TestBed.get(ImageService);
    service.tryToGetRemoteImage(noUrlImageMock).subscribe(result => {
      expect(result).toBeNull();
      done();
    });
  });

  /********************************************************************************/
  /********************************************************************************/

  /**************************************************************************/
  /********** TRY TO GET REMOTE IMAGE - RETURNED VALUE - MAIN CALL **********/
  /**************************************************************************/

  it('should return an object when tryToGetRemoteImage is called and response status is equal to 200', (done) => {
    const service: ImageService = TestBed.get(ImageService);
    service.localEndPoint = '../../assets/data/mock/image/';
    service.pathToJson = 'fooPathToJson';

    service.tryToGetRemoteImage(remoteImageMock).subscribe(result => {
      expect(result).toBeTruthy();
      expect(result).not.toBeNull();
      done();
    });
  }, 10000);

});
