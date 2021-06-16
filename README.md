


# Web Anomaly Server
### Preview from Website
![enter image description here](https://i.ibb.co/BPNBQMD/anoamlywebserver.png)
Our Website is made especially for pilots and flight researchers that want to explore flight data. 
Users can upload regular flight CSV (uses for learning the data and correlation) and another data flight CSV that we want to check for anomalies.  
The CSV files are upload to the server, and the user gets an alert when the server got the files.\
After the server runs the algorithm to learn & detect and results are ready, the user will get an alert and can display a table with anomalies that were detected. 
## Directory hierarchy

**Model**:
 - **Connect**- Opening a connection with the server in a separate thread, the IP and port arguments are given by the user.\
 - **Task** - Puts a new task in the Thread tasks queue, the task contains a command with a new value to one of the flight values, according to the movement of the joystick.\
 - **FGModel** -  using to learn data and detect anomalies using regression algorithm.

 **Controller**:
- **expServer.js** - server itself. using express node.js module for the server. Handling HTTP GET '/' request and POST '/detect' request. 

**View**:
- **index.html** - this is the client-side view of the server.Using HTML and JavaScript to change and create elemnts in client-side. 
![enter image description here](https://siliconcanals.com/wp-content/uploads/2019/08/airplane-travel-tip.jpg)
## Installation and Running the application
 - **For Developers** - install a proper IDE for Web Application (we used WebStorm but you can use any other software). You will need to install few programs and modules- 
 - [ ] **Node.js** - we worked with 14.17.0 version which you can download here - [Download | Node.js (nodejs.org)](https://nodejs.org/en/download/)
 - [ ] **npm** - install npm from here - [npm | get npm (npmjs.com)](https://www.npmjs.com/get-npm)
 - [ ] **express module** - in the command line (after installed npm) enter - \
  `$ npm install express --save` \
 for more information enter [here](https://expressjs.com/en/starter/installing.html).
 - [ ]  **express-fileupload module** - in the command line (after installed npm) enter  -\
  `$ npm i express-fileupload`\
  for more information enter [here](https://www.npmjs.com/package/express-fileupload).
 - [ ]  **Working Directory** - Make sure your working directory is set to -\
` ~\webapplication\Controller`\
if it is not, please change it for all things to run smoothly.
 - **For Users** -
 Make sure that server is running and browse  to - 
 >  http://localhost:8080/
 
 upload files and wait until the result get back. Then click on the button that showed up, the result will be displayed in a table. 
## Documentation
Here you can find a Link to UML that contains partial information of the central classes. UML represents the various connections between the classes and the most important information found in each class. UML can be found [here](https://lucid.app/lucidchart/efc80c83-86a0-4a25-b8c5-999e750ff869/view?page=0_0#). 
If you are a developer you can find full documentation of functions, variables, and more in the code.
## Video
Here you can find a link to our demo video - [link](https://youtu.be/BbjbQuLcp-E).
