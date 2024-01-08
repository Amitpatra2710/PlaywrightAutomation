Feature: Greetings
    @Validation
    Scenario Outline: Placing the order
        Given a login to ecommerce2 application with "<email>" and "<password>"
        Then  Verify Error message is displayed
         
        Examples:
        | email                   | password |
        | amitbaranpatra@gmail.com| Amit@2710|
        | hello123@gmail.com      | hello1   |
