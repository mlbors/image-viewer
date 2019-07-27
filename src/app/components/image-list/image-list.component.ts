/**
 * Image Viewer - Image Service - Component
 *
 * @since       2019.07.24
 * @version     1.0.0.0
 * @author		  mlbors
 * @copyright	  -
 */

/*****************************/
/********** IMPORTS **********/
/*****************************/

import { Component, OnInit } from '@angular/core';

import { ImageService } from '../../services/image.service';
import { IImageService } from '../../interfaces/iimage-service';

/********************************************************************************/
/********************************************************************************/

/*******************************/
/********** COMPONENT **********/
/*******************************/

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss'],
  providers: [ ImageService ]
})

/********************************************************************************/
/********************************************************************************/

/******************************************/
/********** IMAGE LIST COMPONENT **********/
/******************************************/

export class ImageListComponent implements OnInit {

  /*******************************/
  /********** ATTRIBUTS **********/
  /*******************************/

  /**
   * @var IImageService imageService service object used to query images
   */

  public imageService: IImageService;

  /********************************************************************************/
  /********************************************************************************/

  /*********************************/
  /********** CONSTRUCTOR **********/
  /*********************************/

  /**
   * @param IImageService imageService service object used to query images
   */

  constructor(imageService: ImageService) {
    this.imageService = imageService;
    this.imageService.localEndPoint = '../../../assets/data/mock/image/';
    this.imageService.pathToJson = '../../../assets/data/mock/json/main-feed-mock.json';
  }

  /********************************************************************************/
  /********************************************************************************/

  /********************************/
  /********** NG ON INIT **********/
  /********************************/

  ngOnInit() {
    this.imageService.getAllImages().subscribe(result => {
      console.log('Service called');
      console.log(result);
      result.forEach((image, i) => {
        this.imageService.getImage(image).subscribe(loadedImage => {
          console.log(loadedImage);
        });
      });
    });
  }

}
