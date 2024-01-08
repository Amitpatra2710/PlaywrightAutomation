// @ts-check
const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  retries :0,
  
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
  
    timeout: 5000
  },
  
  reporter: 'html',
  projects : [
    {
    name : 'Safari',
    use: {

      browserName : 'webkit',
      headless : true,
      screenshot : 'on',
      trace : 'on',//off,on
      //trace : 'retain-on-failure',
         }
    },
    {
      name : 'chromium',
    use: {

      browserName : 'chromium',
      headless : true,
      screenshot : 'on',
      trace : 'on',//off,on
      //trace : 'retain-on-failure',
         }
  }
    
  ]

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
}

module.exports = config;
