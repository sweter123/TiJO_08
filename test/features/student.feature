Feature: Searching
  Scenario: Last name
    When I browse to the "/"
    When I enter "Spencer" into "input.last" field
    Then the css element "td:nth-of-type(2)" should contain the text "Spencer"
    Then I should see "Spencer" in "lastName" column in row "1" of "student.table" table
  Scenario: Age
    When I browse to the "/"
    When I enter "21" into "input.age" field
    Then the css element "td:nth-of-type(3)" should contain the text "21"
    Then I should see "Gray" in "firstName" column in row "1" of "student.table" table
  Scenario: Search
    When I browse to the "/"
    When I enter "Chang" into "input.search" field
    Then the css element "td:nth-of-type(1)" should contain the text "Chang"
    Then I should see "Chang" in "firstName" column in row "1" of "student.table" table
  Scenario: Email
    When I browse to the "/"
    When I enter ".tv" into "input.email" field
    Then the css element "td:nth-of-type(4)" should contain the text "good.burnett@undefined.tv"
    Then I should see "good.burnett@undefined.tv" in "email" column in row "1" of "student.table" table
    Then pause