# Budget Tracker
I updated an existing budget tracker application to allow for offline access and functionality. The user will be able to add expenses and deposits to their budget with or without a connection. If the user enters transactions offline, the total should be updated when they're brought back online.

## User Story
AS AN avid traveler<br>
I WANT to be able to track my withdrawals and deposits with or without a data/internet connection<br>
SO THAT my account balance is accurate when I am traveling <br>

## Performance Criteria
GIVEN a budget tracker without an internet connection<br>
WHEN the user inputs an expense or deposit<br>
THEN they will receive a notification that they have added an expense or deposit<br>
WHEN the user reestablishes an internet connection<br>
THEN the deposits or expenses added while they were offline are added to their transaction history and their totals are updated<br>

## Technologies Used
- JavaScript
- MongoDB
- Node.js
- Mongoose.js
- IndexedDB
- service-workers
- Heroku
- Atlas

## Link to the Deployed Application
 https://gentle-peak-80984.herokuapp.com/