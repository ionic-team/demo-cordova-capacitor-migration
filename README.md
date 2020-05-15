# Demo: Cordova to Capacitor migration

A modified version of the [Ionic Conference demo app](https://github.com/ionic-team/ionic-conference-app) that adds the ability to set the logged-in user's profile picture using the Camera on their device. 

To see this app in action, check out the [Capacitor 2.0 Launch presentation](https://ionicframework.com/resources/webinars/capacitor-2-launch). During the presentation, the Cordova version of this app is [migrated to Capacitor](https://capacitor.ionicframework.com/docs/cordova/migration-strategy), then the Cordova Camera, File, and Storage plugins are migrated over to their Capacitor equivalents.

> Note: This app is meant to be a demo sample and thus may not be maintained over time. Specs: @ionic/angular 5, Angular 8, Cordova Android 8, Cordova iOS 5, and Capacitor 2.1.0.

## Implementation Details

The Cordova version (iOS, Android):

* Taking pictures: [Ionic Native/Cordova Camera plugin](https://ionicframework.com/docs/native/camera)
* Saving files to the device: [Ionic Native/Cordova File plugin](https://ionicframework.com/docs/native/file)
* Caching app data: [Ionic Storage plugin](https://ionicframework.com/docs/building/storage)

The Capacitor version (iOS, Android, and could easily be extended with PWA support):

* Taking pictures: [Capacitor Camera plugin](https://capacitor.ionicframework.com/docs/apis/camera)
* Saving files to the device: [Capacitor Filesystem plugin](https://capacitor.ionicframework.com/docs/apis/filesystem). Changed from Cordova File plugin to this, which also brings support for PWAs.
* Caching app data: [Capacitor Storage plugin](https://capacitor.ionicframework.com/docs/apis/storage)

## Project Structure

The Cordova version of the app is under the `cordova/` folder. You guessed it! The Capacitor version is under the `capacitor/` folder.

The `PhotoService` class (`src/app/providers/photo.service.ts`) contains all logic to take pictures, write files, and store data. It is used in the Account class (`src/app/pages/account/account.ts`).

## How to Run

- If not already installed, install Ionic and native-run: `npm install -g @ionic/cli native-run`.
- Clone this repository.
- In a terminal, change directory into the repo: `cd demo-cordova-capacitor-migration`.
- Change into the Capacitor directory: `cd capacitor`.
- Run `npm install`.
- Run `npx cap sync android`.
- Run `npx cap open android` to open Android Studio and run the app on a device.
- For more details, see [development workflow](https://capacitor.ionicframework.com/docs/basics/workflow).
