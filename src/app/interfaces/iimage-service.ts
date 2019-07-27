/**
 * Image Viewer - Image Service - Interface
 *
 * @since       2019.07.24
 * @version     1.0.0.0
 * @author		  mlbors
 * @copyright	  -
 */

/*****************************/
/********** IMPORTS **********/
/*****************************/

import { Observable } from 'rxjs';

import { IImageType } from '../interfaces/iimage-type'

/********************************************************************************/
/********************************************************************************/

/************************************/
/********** IIMAGE SERVICE **********/
/************************************/

export interface IImageService {
  feed: IImageType[];
  localEndPoint: string;
  pathToJson: string;
  preloadedImages: IImageType[];
  preloadThreshold: number;
  rejectUnauthorized: boolean;
  shuffledFeed: IImageType[];
  strictSsl: boolean;

  parseFeed(): Observable<IImageType[]>;
  getAllImages(): Observable<IImageType[]>;
  getAllImagesInShuffledOrder(): Observable<IImageType[]>;
  getImage(image: IImageType): Observable<HTMLImageElement>;
  getRandomImage(): Observable<HTMLImageElement>;
  tryToGetLocalImage(image: IImageType): Observable<HTMLImageElement>;
  tryToGetRemoteImage(image: IImageType): Observable<HTMLImageElement>;
}
