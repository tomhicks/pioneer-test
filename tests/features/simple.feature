Feature: Simple Feature

  Background:
    Given I visit MoneyHub

  Scenario: Entering Information
    When I log in
    And I click the liability tile
    Then I should see my debt information
