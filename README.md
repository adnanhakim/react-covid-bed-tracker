
# COVID Bed Tracker

## About

COVID Bed Tracker is a React application responsible for live tracking beds at various hospitals for COVID-19 patients to avoid unnecessary crowding at hospitals. The main aim of this platform is to create an easy and efficient way for patients to be able to live-track and book hospital beds, thus avoiding wasting time by manually going and searching for free beds in various hospitals. 

This project was developed during _Recursion 2.0 - a 24-hour virtual hackathon_ hosted by [RGIT](https://www.linkedin.com/in/mctrgitofficial/) and **won the 1st Runner Up** at the hackathon.

View the Node.js/Express backend [here](https://github.com/arshshaikh06/covid-bed-tracker-backend)

## Technology Stack

1. Web Application developed using React.js
2. Mobile Application developed using Flutter
3. Backend developed using Node.js/Express
5. Patient authentication using Firebase's OTP login
6. Hospital admin authentication using Passport.js 
7. Data stored in cloud via MongoDB Atlas

## Developers

-  Adnan Hakim [github.com/adnanhakim](https://github.com/adnanhakim)
   -  React.js Frontend 

-  Bhavesh Singh [github.com/bhaveshsingh0206](https://github.com/bhaveshsingh0206)
   -  React.js Frontend & Node.js Backend

-  Ali Abbas Rizvi [github.com/rizvialiabbas](https://github.com/rizvialiabbas)
   -  Node.js Backend

-  Arsh Shaikh [github.com/arshshaikh06](https://github.com/arshshaikh06)
   -  Node.js Backend

## Flowchart

![Flow of the project](https://i.imgur.com/ELio5lq.jpg)

- It has two types of logins - Hospital Admin and Patients. 
- In this application, hospitals declare the number of beds (normal beds, ICU beds without ventilators and ICU beds with ventilators) that they currently host. 
- Patients can then reserve a bed at a hospital by filling out an application form providing all necessary details with an option of a COVID report or a doctor's consultation. 
- The hospital admin can confirm or deny their reservation. 
- Upon confirmation, the patient will receive a QR code which he/she can go to the - hospital where it will be scanned to confirm their reservation. 
- Failure to show up on time (4 hours) will result in the bed being made available for other patients.

## Features

- Register and authenticate hospital admins using JWTs (JSON Web Tokens)
- Register patients using Firebase mobile OTP authentication
- Searching for free beds in a list of various hospitals that can be filtered based on location
- Chatbot to answer queries related to COVID-19 and our platform
- Booking of beds can be done through the platform by providing identity proof and reports like COVID report or a doctor's consultation in pdf format
- Statistical data and graphs related to the current number of covid cases 
- A Flutter app has also been created for scanning QR code to confirm a booking by hospital admin 
- Has a pleasant UI/UX built to look awesome from mobile to desktop

## Screenshots

### Overview
![Preview](https://i.imgur.com/W8op4O3.png)

### Dashboard
![View](https://i.imgur.com/utiI2Ry.png)

### Hospital Information 
![View](https://i.imgur.com/iaYN4Aq.png)

### Reservation Form
![This](https://i.imgur.com/0ofa8tr.png)

### Chatbot 
![OkView](https://i.imgur.com/dTvrsrk.png)

## MIT LICENSE

> Copyright (c) 2021 Team Void
>
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all
> copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
> SOFTWARE.
