/**
 * Image Viewer - Image Type - Interface
 *
 * @since       2019.07.24
 * @version     1.0.0.0
 * @author		  mlbors
 * @copyright	  -
 */

/*********************************/
/********** IIMAGE TYPE **********/
/*********************************/

export interface IImageType {
  check_json: boolean;
  container: string;
  container_index: number;
  downloaded: boolean;
  fullname: string;
  img_attribut: string;
  name: string;
  not_download: boolean;
  url: string; 
}
