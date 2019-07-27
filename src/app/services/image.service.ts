/**
 * Image Viewer - Image Service - Service
 *
 * @since       2019.07.24
 * @version     1.0.0.0
 * @author		  mlbors
 * @copyright	  -
 */

/*****************************/
/********** IMPORTS **********/
/*****************************/

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IImageService } from '../interfaces/iimage-service';
import { IImageType } from '../interfaces/iimage-type';

/********************************************************************************/
/********************************************************************************/

/***********************************/
/********** IMAGE SERVICE **********/
/***********************************/

@Injectable({
  providedIn: 'root'
})

export class ImageService implements IImageService {

  /*******************************/
  /********** ATTRIBUTS **********/
  /*******************************/

  /**
   * @param Array feed feed of images
   * @param string localEndPoint where to look at for files locally
   * @param string pathToJson JSON file containing data
   * @param Array preloadedImages images that were already preloaded during rendering process
   * @param number preloadThreshold number of images to preload
   * @param boolean rejectUnauthorized tells to reject unauthorized request or not
   * @param Array suffledFeed shuffled eed of images
   * @param boolean strictSsl tells to use strict ssl or not
   */

  public feed: IImageType[] = [];
  public localEndPoint: string;
  public pathToJson: string;
  public preloadedImages: IImageType[] = [];
  public preloadThreshold: number = 5;
  public rejectUnauthorized: boolean = false;
  public shuffledFeed: IImageType[] = [];
  public strictSsl: boolean = false;

  /********************************************************************************/
  /********************************************************************************/

  /*********************************/
  /********** CONSTRUCTOR **********/
  /*********************************/

  /**
   * @param HttpClient _http http client
   */

  constructor(private _http: HttpClient) {

  }

  /********************************************************************************/
  /********************************************************************************/

  /********************************/
  /********** PARSE FEED **********/
  /********************************/

  /**
   * @return Observable<IImageType[]>
   */

  public parseFeed(): Observable<IImageType[]> {

    console.info('::: PARSE FEED :::');

    return new Observable(observer => {
      if (typeof this.pathToJson === 'undefined' || !this.pathToJson || this.pathToJson === null || this.pathToJson === '') {
        observer.next(null);
        observer.complete();
        return;
      }

      this._http.get<Array<IImageType>>(this.pathToJson).subscribe(result => {
        if (typeof result['images'] === 'undefined' || !result['images'] || result['images'] === null) {
          console.info('Cannot find images in feed');
          observer.next(null);
          observer.complete();
          return;
        } else {
          this.feed = result['images'];
          console.log(this.feed);
          observer.next(this.feed);
          observer.complete();
          return;
        }
      },
      error => {
        console.error('Error while Pasring Json feed');
        console.info(error);
        observer.next(null);
        observer.complete();
        return;
      });
    })
  }

  /********************************************************************************/
  /********************************************************************************/

  /************************************/
  /********** GET ALL IMAGES **********/
  /************************************/

  /**
   * @return Observable<IImageType[]>
   */

  public getAllImages(): Observable<IImageType[]> {
    return new Observable(observer => {

      console.info('::: GET ALL IMAGES :::');

      if (typeof this.feed === 'undefined' || this.feed === null || this.feed.length === 0) {
        this.parseFeed().subscribe(result => {
          console.info('...parsing feed');
          observer.next(result);
          observer.complete();
          return;
        },
        error => {
          console.error('Error while getting all images');
          console.info(error);
          observer.next(null);
          observer.complete();
          return;
        });
      } else {
        observer.next(this.feed);
        observer.complete();
        return;
      }
    });
  }

  /********************************************************************************/
  /********************************************************************************/

  /**************************************************/
  /********** GET ALL IMAGES SUFFLED ORDER **********/
  /**************************************************/

  /**
   * @return Observable<IImageType[]>
   */

  public getAllImagesInShuffledOrder(): Observable<IImageType[]> {
    return new Observable(observer => {

      console.info('::: GET ALL IMAGES IN SHUFFLED ORDER :::');

      if (typeof this.feed === 'undefined' || this.feed === null || this.feed.length === 0) {
        this.getAllImages().subscribe(result => {

          if (typeof result === 'undefined' || !result || result === null) {
            observer.next(null);
            observer.complete();
            return;
          } else {
            const shuffleArray = this._shuffleFeed();
            observer.next(shuffleArray);
            observer.complete();
            return;
          }
        },
        error => {
          console.error('Error while getting all images in suffled order');
          console.info(error);
          observer.next(null);
          observer.complete();
          return;
        });
      } else {
        const shuffleArray = this._shuffleFeed();
        observer.next(shuffleArray);
        observer.complete();
        return;
      }
    });
  }

  /********************************************************************************/
  /********************************************************************************/

  /************************************/
  /********** PRELOAD IMAGES **********/
  /************************************/

  /**
   * @return Observable<HTMLImageElement>
   */

  public async *preloadImages() {
    let index = 0;
    while (index < this.feed.length) {
      for (let i = 0; i < this.preloadThreshold ; i++) {
        /**
         * TODO
         * 
         * Select an array to use
         * Loop over array
         * Check if selected images were already loaded
         * Load image if need
         * Push images in the array containg preloaded images
         */
        index++;
      }
      yield 'foo';
    }
  }

  /********************************************************************************/
  /********************************************************************************/

  /*******************************/
  /********** GET IMAGE **********/
  /*******************************/

  /**
   * @param IImageType image image object
   * @return Observable<HTMLImageElement>
   */

  public getImage(image: IImageType): Observable<HTMLImageElement> {
    return new Observable(observer => {

      console.info('::: GET IMAGE :::');

      if (typeof this.pathToJson === 'undefined' || !this.pathToJson || this.pathToJson === ''
      || typeof this.localEndPoint === 'undefined' || !this.localEndPoint || this.localEndPoint === '') {
        console.info('A parameter is missing');
        console.info(this.pathToJson);
        console.info(this.localEndPoint);
        observer.next(null);
        observer.complete();
        return;
      } else if (typeof image === 'undefined' || image === null) {
        console.info('Passed image is null or undefined');
        console.info(image);
        observer.next(null);
        observer.complete();
        return;
      } else {
        this.tryToGetLocalImage(image).subscribe(result => {
          if (typeof result === 'undefined' || !result || result === null) {
            console.info('Failed to load local image, trying to load remote image');

            this.tryToGetRemoteImage(image).subscribe(remoteResult => {
              observer.next(remoteResult);
              observer.complete();
              return;
            },
            error => {
              console.error('Error while getting remote image');
              console.info(error);
              observer.next(null);
              observer.complete();
              return;
            });
          } else {
            observer.next(result);
            observer.complete();
            return;
          }
        },
        error => {
          console.error('Error while getting local image');
          console.info(error);
          observer.next(null);
          observer.complete();
          return;
        });
      }
    });
  }

  /********************************************************************************/
  /********************************************************************************/

  /**************************************/
  /********** GET RANDOM IMAGE **********/
  /**************************************/

  /**
   * @return Observable<HTMLImageElement>
   */

  public getRandomImage(): Observable<HTMLImageElement> {
    return new Observable(observer => {

      console.info('::: GET RANDOM IMAGE :::');

      if (typeof this.feed === 'undefined' || this.feed === null || this.feed.length === 0) {
        this.getAllImages().subscribe(result => {

          if (typeof result === 'undefined' || !result || result === null) {
            observer.next(null);
            observer.complete();
            return;
          } else {
            const randomImageFromFeed = this._getRandomImageFromFeed();
            this.getImage(randomImageFromFeed).subscribe(image => {
              console.info(image);
              observer.next(null);
              observer.complete();
              return;
            });
          }
        },
        error => {
          console.error('Error while getting a random image');
          console.info(error);
          observer.next(null);
          observer.complete();
          return;
        });
      }

      const randomImageFromFeed = this._getRandomImageFromFeed();
      this.getImage(randomImageFromFeed).subscribe(image => {
        console.info(image);
        observer.next(null);
        observer.complete();
      });

    });
  }

  /********************************************************************************/
  /********************************************************************************/

  /********************************************/
  /********** TRY TO GET LOCAL IMAGE **********/
  /********************************************/

  /**
   * @param IImageType image image object
   * @return Observable<HTMLImageElement>
   */

  public tryToGetLocalImage(image: IImageType): Observable<HTMLImageElement> {

    console.info('::: TRY TO GET LOCAL IMAGE :::');

    return new Observable(observer => {
      if (typeof image === 'undefined' || image === null || !image) {
        console.info('Image is unedfined or null');
        observer.next(null);
        observer.complete();
        return;
      } else {
        const path = this.localEndPoint + image.fullname;

        this._getImageUrlStatus(path).subscribe(result => {
          if (result !== 200) {
            console.log('Cannot load local image');
            console.info(result);
  
            observer.next(null);
            observer.complete();
            return;
          } else {
            const img = new Image();
            img.src = path;
    
            console.log('Image found');
            console.info(img);
    
            observer.next(img);
            observer.complete();
            return;
          }
        },
        error => {
          console.error('Error while getting local image');
          console.info(error);
          observer.next(null);
          observer.complete();
          return;
        });
      }
    });
  }

  /********************************************************************************/
  /********************************************************************************/

  /*********************************************/
  /********** TRY TO GET REMOTE IMAGE **********/
  /*********************************************/

  /**
   * @param IImageType image image object
   * @return Observable<HTMLImageElement>
   */

  public tryToGetRemoteImage(image: IImageType): Observable<HTMLImageElement> {
    console.info('::: TRY TO GET REMOTE IMAGE :::');

    return new Observable(observer => {

      if (typeof image === 'undefined' || image === null || !image) {
        observer.next(null);
        observer.complete();
        return;
      } else {
        this._getImageUrlStatus(image.url).subscribe(result => {
          console.log(result);
  
          if (result !== 200) {
            console.log('Cannot load remote image');
            console.info(result);
  
            observer.next(null);
            observer.complete();
            return;
          } else {
            const img = new Image();
            img.src = image.url;
            observer.next(img);
            observer.complete();
            return;
          }
        },
        error => {
          console.error('Error while getting remote image');
          console.info(error);
          observer.next(null);
          observer.complete();
          return;
        });
      }
    });
  }

  /********************************************************************************/
  /********************************************************************************/

  /******************************************/
  /********** GET IMAGE URL STATUS **********/
  /******************************************/

  /**
   * @param string url url to test
   * @return Observable<number>
   */

  protected _getImageUrlStatus(url: string): Observable<number> {
    console.info('::: GET IMAGE URL STATUS :::');
    return new Observable(observer => {
      if (typeof url === 'undefined' || url === null || !url || url === '' || url === 'null') {
        console.info('No URL to check');
        observer.next(500);
        observer.complete();
        return;
      } else {
        const options = {
          headers: new HttpHeaders({
            Accept: 'application/json',
            rejectUnauthorized: String(this.rejectUnauthorized),
            strictSSL: String(this.strictSsl)
          }),
          observe: 'response' as 'body',
          params: new HttpParams(),
          responseType: 'text' as 'json'
        };

        console.log(`url: ${url}`);
        this._http.get<any>(url, options).subscribe(res => {
          console.info(res.status);
          observer.next(res.status);
          observer.complete();
          return;
        },
        error => {
          console.error(error);
          observer.next(500);
          observer.complete();
          return;
        });
      }
    });
  }

  /********************************************************************************/
  /********************************************************************************/

  /************************************************/
  /********** GET RANDOM IMAGE FROM FEED **********/
  /************************************************/

  /**
   * @return IImageType
   */

  private _getRandomImageFromFeed(): IImageType {
    return this.feed[Math.floor(Math.random() * this.feed.length)];
  }

  /********************************************************************************/
  /********************************************************************************/

  /**********************************/
  /********** SHUFFLE FEED **********/
  /**********************************/

  /**
   * @return Array
   */

  private _shuffleFeed(): IImageType[] {
    this.shuffledFeed = this.feed;
    this.shuffledFeed.sort((a, b) => 0.5 - Math.random());
    return this.shuffledFeed;
  }
}
