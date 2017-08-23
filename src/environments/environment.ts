// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBpx6Z3SlpLqUwZlfz8LUXZ_7Et-zVenz0",
    authDomain: "fueling-station.firebaseapp.com",
    databaseURL: "https://fueling-station.firebaseio.com",
    projectId: "fueling-station",
    storageBucket: "fueling-station.appspot.com",
    messagingSenderId: "862897092277"
  }
};
