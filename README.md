# Covid Bed Tracker React App

This project is responsible for tracking beds at various hospitals for covid patients in order to avoid too much unnecessary crowding at the hospitals. The main aim of the project is create an easy and effecient way for patients to be able to book these beds and avoid wasting time by manually going and searching for free beds in various hospitals. It has 2 types of logins viz. Hospital Admin and Patients. Patients can reserve a bed at a hospital by filling application form, and the hospital admin can confirm their reservation in person by scanning a QR code.



## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


# Features

- Register and authenticate hospital admins using JSON web tokens

- Register patients using firebase mobile otp authentication

- Searching for free beds in a list of various hospitals that can be filtered based on location

- Chatbot to answer queries related to covid-19 and our platform

- Booking of beds can be done through the platform by providing proof like aadhar in pdf format

- Statistical data and graphs related to current number of covid cases 

- A flutter app has also been created for scanning QR code to confirm a booking by hospital Admin 

- Have a pleasant UI/UX built to look awesome from mobile to desktop
