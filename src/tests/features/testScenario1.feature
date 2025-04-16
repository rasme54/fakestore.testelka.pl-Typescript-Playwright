

Feature: First Tesc scenario - Log/Sign in
    Scenario: Scenario 1: Register User
        Given I am on the main page
        When I fill in the sign up entry fields and confirm
        And I fill account infromation
        And I fill delivery infromation
        And I fill billing infromation
        Then I delete account