import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Plugins, CameraResultType, FilesystemDirectory, Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  USER_PROFILE_PIC: string = "user_profile";
  AVATAR_PIC: string = "https://www.gravatar.com/avatar?d=mm&s=140";

  constructor(private file: File, private webview: WebView) 
  { }

  async loadSaved(): Promise<Photo> {
    const { Storage } = Plugins;

    let photo = await Storage.get({ key: this.USER_PROFILE_PIC });
    console.log(photo);
    //     || {
    //     filepath: this.AVATAR_PIC,
    //     webviewPath: this.AVATAR_PIC
    // };
    
    return photo;
  }

  // Open the device's camera, take a picture, then save it to the filesystem.
  async takePicture() {
    const { Camera } = Plugins;
    
    // The following Example filepaths are from iOS - Android paths will be slightly different.
    // Captured image from the device, currently stored in a temp directory.
    // Result example: file:///var/mobile/Containers/Data/Application/E4A79B4A-E5CB-4E0C-A7D9-0603ECD48690/tmp/cdv_photo_003.jpg
    const capturedTempImage = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      quality: 90
    });
    
    // Result example: file:///var/mobile/Containers/Data/Application/E4A79B4A-E5CB-4E0C-A7D9-0603ECD48690/tmp/cdv_photo_003.jpg
    const savedImageFile = await this.savePicture(capturedTempImage);

    // Cache all photo data for future retrieval
    const { Storage } = Plugins;
    Storage.set({ 
      key: this.USER_PROFILE_PIC, 
      value: JSON.stringify(savedImageFile) 
    });

    return savedImageFile;
  }

  // Save picture to file on device
  // The following Example filepaths are from iOS - Android paths will be slightly different.
  async savePicture(cameraImage) {
    const { Filesystem } = Plugins;

    // Read the file into base64 format
    const file = await Filesystem.readFile({
      path: cameraImage.path
    });

    // Write the file to the data directory
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: file.data,
      directory: FilesystemDirectory.Data
    });

    // Rewrite from a device filepath (file:// protocol) to the local HTTP server (https:// protocol) hosting this Ionic app by using the 
    // Capacitor.convertFileSrc helper function.
    return {
      filepath: savedFile.uri,
      webviewPath: Capacitor.convertFileSrc(savedFile.uri),
    };
  }
}

class Photo {
  filepath: string;
  webviewPath: string;
}
