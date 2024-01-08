// @ts-check
const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  retries :0,
  //workers :3, //For parallel execution (Default 5)
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
  
    timeout: 5000
  },
  
  reporter: 'html',

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {

    browserName : 'chromium',
    headless : false,
    screenshot : 'on', //'only-on-failure'
    trace : 'on',//off,on
    //ignoreHttpsError: true,
    //Permissions: ['geolocation'],
    //trace : 'retain-on-failure',
    //viewport : {width:720,height:720},
    //...devices['iPhone 11'] //Works with webkit
    //video: 'retain-on-failure',
  },


};

module.exports = config;
