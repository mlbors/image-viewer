/**
 * Image Viewer - Mock
 *
 * @since       2019.07.24
 * @version     1.0.0.0
 * @author		  mlbors
 * @copyright	  -
 */

/*****************************/
/********** IMPORTS **********/
/*****************************/

import { IImageType } from '../../../../app/interfaces/iimage-type';

/********************************************************************************/
/********************************************************************************/

/***************************************/
/********** REMOTE IMAGE MOCK **********/
/***************************************/

export const RemoteImageMock = {
  check_json: true,
  container: 'foo_container',
  container_index: 2,
  downloaded: true,
  fullname: 'foo_none.jpg',
  img_attribut: 'src',
  name: 'foo_name',
  not_download: false,
  url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/The_spectacular_star-forming_Carina_Nebula_imaged_by_the_VLT_Survey_Telescope.jpg/800px-The_spectacular_star-forming_Carina_Nebula_imaged_by_the_VLT_Survey_Telescope.jpg'
};