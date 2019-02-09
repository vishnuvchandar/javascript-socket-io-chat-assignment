# Socket.IO Chat Assignment

## Objective

The Objective of this assignment is to work with Javascript on both client and server side, understand reactive programming using socket.io by building a Socket Server and a Socket Client.  

## Prerequisites

1. Fork this boilerplate repository  
2. Clone the boilerplate repository and cd into it  
3. Install dependencies.   

```
  npm install
```

4. Run the application which shall host a Socket Server API and host the static files using Express which has the Socket Client

```
  npm run start
```

5. Browse - http://localhost:3000  

## Coding Guidelines

1. All your HTML code resides in public/index.html  
2. All your **`client-side`** JavaScript code resides in the `public/js/script.js` file
3. All your **`server side`** Javascript code should reside in `server.js` file
4. Do **not use jQuery** in public/js/script.js file and server.js file.
5. Al your CSS code resides in the public/css folder  
6. HTML, Javascript, CSS code should be well indented and commented  
7. You shall use more of Bootstrap components like Cards, Alerts to style your elements  
8. The Assignment should be pushed to gitlab once all the local test cases (npm run test) and eslint issues (npm run eslint) are resolved and submitted for Preliminary Automated Review (which shall validate the solution against more test cases) as described below.  

## Assignment

1. Users need to register first with the Socket server before they could send messages or join/leave channels  
2. While registration, users shall provide their username as well as channels they would like to join  
3. A Welcome message from System is sent to users on registration  
4. Users are able to join new channels post registration as well   
5. Users can leave channels as well for which he shall be able to refer to a list with all the channels he is part of from where he can select the specific channel he wish to leave  
6. Users get notified if they were able to join or leave channels  
7. Users receive the chat messages which are sent from other people to any of the channels they have joined  
8. Users are able to send messages to channels individually  

## Instructions 

 1. Following events are expected to be flowing in the application between client and server  

 
                      register,  {username, channels}
                     ----------------------->
                  welcomeMessage, "Welcome [username] !!"
                     <-----------------------
                     addedToChannel, { channel }
                     <-----------------------
               ( in case channels also sent on registration )


                       joinChannel, { channel }
                     ----------------------->
                      addedToChannel, { channel }
                     <-----------------------


                       leaveChannel, { channel }
                     ----------------------->
                      removedFromChannel, { channel }
                     <-----------------------


                       message, { username, channel, message }
                     ----------------------->
                       newMessage, { username, channel, message }
                     <-----------------------
               ( to all the clients who have joined the specific channel )

 2. At Client side - You are expected to implement following methods in script.js which handles respective button clicks or any socket events received as called in index.html -  
   a. sendMessage() - appends the message to `#chatContainer` at the top as `Me : [message]` and emits `message` to server  
   b. joinChannel() - emits `joinChannel` to server  
   c. leaveChannel() - emits `leaveChannel` to server  
   d. onWelcomeMessageReceived() - appends the message to `#chatContainer` as `System : [message]`  
   e. onNewMessageReceived() - appends the message to `#chatContainer` at the top as `[senderUsername] : [message]`  
   f. onAddedToNewChannelReceived() - appends a Bootstrap Alert `You are added to <strong>${channel}</strong> successfully!` to `#alertContainer` and adds the channel in `#channelsList`  
   g. onRemovedFromChannelReceived() - appends a Bootstrap Alert `You are removed from <strong>${data.channel}</strong> successfully!` to `#alertContainer` and removes the channel from `#channelsList`  

 3. At Server side - Socket Server is expected to have following behaviour which shall be defined in server.js -  
   a. On receiving `register`, it emits `welcomeMessage` to sender, adds the socket to all the provided channels, emits `addedToChannel` to sender for every channel joined by them   
   b. On receiving `joinChannel`, it makes the socket join the channel and emits `addedToChannel` to sender  
   c. On receiving `leaveChannel`, it makes the socket leave the channel and emits `removedFromChannel` to sender  
   d. On receiving `message`, it emits `newMessage` to all the clients joined to the provided channel excluding the sender of the message  

## Important Points for the Assignment

In order to do the server side part of socket assignment:

1) Take a look at https://socket.io/docs/server-api/#Socket for server side methods that you can use for joining or leaving a channel etc.

2) Do not use `jQuery` in script.js and server.js files. The jQuery used in index.html is purely for Bootstrap UI components (Modals). **Use only `Javascript`**

3) In server.js the server side socket listening and emitting should happen strictly in the callback method of `register` socket event listener as shown below

```
socket.on('register', user => {
  // The rest of the server side events like
  // `message`, `joinChannel` etc 
  // should be handled here
});

```


## Submitting your solution for preliminary automated review  

 1. Open https://hobbes-cts.stackroute.in/#/ and login into the platform  
 2. Under Assignment repository select `javascript-socket-io-chat-assignment`, and branch master  
 3. Under Your solution repository select your own repository and branch  
 4. Press Submit  
 5. Press click here for the feedback  
 6. Evaluation will take around 2 mins to complete after which you need to refresh your browser and get the updated status  
 7. Watch out for your total score and detailed status on each test and eslint errors in the coloured blocks on the screen  
 8. Fix failing test cases as well as eslint errors and re-submit your solution until you get 100%  
 
## MENTORS TO BEGIN REVIEW YOUR WORK ONLY AFTER ->

- You add the respective Mentor as a Reporter/Master into your Assignment Repository

- You have checked your Assignment on the Automated Evaluation Tool - Hobbes (Check for necessary steps in your Boilerplate - README.md file. ) and got the required score - Check with your mentor about the Score you must achieve before it is accepted for Manual Submission.

- Intimate your Mentor on Slack and/or Send an Email to learner.support@stackroute.in - with your Git URL - Once you are done working and are ready for final submission.
