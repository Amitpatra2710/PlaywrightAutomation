Feature: Greetings
    @Regression
    Scenario: Placing the order
        Given a login to ecommerce application with "amitbaranpatra@gmail.com" and "Amit@2710"
        When Add "ZARA COAT 3" to Cart
        Then Verify "ZARA COAT 4" is displayed in the cart
        #When Enter Valid Details and Place the Order
        #Then Verify order is present in order History

    @Validation
    Scenario Outline: Placing the order
        Given a login to ecommerce2 application with "<email>" and "<password>"
        Then  Verify Error message is displayed
         
        Examples:
        | email                   | password |
        | amitbaranpatra@gmail.com| Amit@2710|
        | hello123@gmail.com      | hello1   |
         