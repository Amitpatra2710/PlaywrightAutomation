const base = require('@playwright/test')

exports.customTest = base.test.extend(
    {
        testDataForOrder: {
            email : "amitbaranpatra@gmail.com",
            password:"Amit@2710",
            productName:"ZARA COAT 3"   
            }
    }
)