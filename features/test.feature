Feature: Login Validations

Scenario: Login with valid credential
Given User is on login page
When User provide valid username "tomsmith" and password "SuperSecretPassword!" and click on login button
Then User should able to see successful login