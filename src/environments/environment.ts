// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// Testing
// export const environment = {
//   production: false,
//   firebase: {
//     apiKey: 'AIzaSyBK2GmcSNowhxCbme5Ddmdw4FjaOCzJ59I',
//     authDomain: 'pollo-kun-test.firebaseapp.com',
//     databaseURL: 'https://pollo-kun-test.firebaseio.com',
//     projectId: 'pollo-kun-test',
//     storageBucket: 'pollo-kun-test.appspot.com',
//     messagingSenderId: '1090388466392'
//   }
// };

// Production
export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDOfNFhiBegPNMHldBij5O_kyyVRUlpkFA",
    authDomain: "pollo-kun.firebaseapp.com",
    databaseURL: "https://pollo-kun.firebaseio.com",
    projectId: "pollo-kun",
    storageBucket: "pollo-kun.appspot.com",
    messagingSenderId: "381404084132"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
