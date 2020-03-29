# Goodwill Hunting


## Getting Started
### **1.** Clone the repo
````
$ git clone https://github.com/jportella93/flickr-gallery.git
$ cd flickr-gallery
````
### **2.** Obtain API keys

In order to have a fully functional version of this app on your local machine, it's necessary to have a [Cloudinary API key](https://cloudinary.com/documentation/image_upload_api_reference) for image upload and storage and a [Google Maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key) for geolocation. This step and the next can be skipped but some features will not work properly.

### **3.** Set up the environment
The Cloudinary API key can be pasted in a .env file at the root of the client folder. A .env.example file has been provided as template.

An activated Google Maps API key can be pasted in the index.html file inside the /client/public folder, at line 45 instead of YOURAPIKEY.

### **4.** Install dependencies
````
$ cd client
$ npm i
$ cd ../server
$ npm i
````

### **5.** Create the database
Make sure that an instance of PostgreSQL is running on your machine, e.g. by using ```brew services start postgresql``` or ```sudo service postgresql start``` on Linux.

Then in the server folder, run the following command:
```
$ npm run createDb
```

### **6.** Start the server and client
Run the same command in both the server and client folder:
```
$ npm start
```
And that's all! You can now sign up and log in as different users and explore the app.



## Built With

* [React](https://reactjs.org/) - frontend library
* [Express](https://expressjs.com/) - backend framework
* [PostgreSQL](https://www.postgresql.org/) and [Sequelize](https://sequelize.org/) - database management

## License

This project is licensed under the MIT License

