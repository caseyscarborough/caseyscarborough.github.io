---
layout: project
title: Projects &middot; HomeLink
---

HomeLink Web Application
========================

<i class="icon-cloud-download"></i> <a href="https://github.com/caseyscarborough/homelink/zipball/master">Download .zip</a> &nbsp; 
<i class="icon-cloud-download"></i> <a href="https://github.com/caseyscarborough/homelink/tarball/master">Download .tar.gz</a> &nbsp; 
<i class="icon-github"></i> <a href="https://github.com/caseyscarborough/homelink">View on GitHub</a>

HomeLink is a web application used to create to-do lists, shopping lists, reminders, and chores for a group of users connected as a 'family'. It is written using the Grails web framework.

Users will be able to create a 'family' that other users can connect to. When a new list, reminder, or chore is created, the user will have the option to create the item for the family, or for themselves. This will allow family members to post to-dos, chores, or other items for the entire family to see, or just for personal use.

The application is currently in the beginning stages of development, and more features will be implemented with time.

You can check out a demo of the application at [homelink.caseyscarborough.com](http://homelink.caseyscarborough.com).

A screenshot of the application in it's current state can be viewed below:

![alt text][screenshot1]

Dependencies
------------
- Java Development Kit 6 or greater
- Groovy 2.1.3
- Grails 2.2.2
- MySQL (optional)

For the development environment, the application uses the default Grails in-memory database, H2. The MySQL database can also be set up if desired by creating a database locally, then changing the dataSource settings on lines 15-38 of the <code>DataSource.groovy</code> file located in the application's <code>grails-app/conf/</code> directory. The settings for MySQL are shown below:

```groovy
dataSource {
  dbCreate = "create-drop" // Can be changed to 'create', 'update', or 'validate'
  url = "jdbc:mysql://localhost:3306/homelink"
  driverClassName = "com.mysql.jdbc.Driver"
  username = "root"
  password = ""
  properties {
    maxActive = 100
    maxIdle = 25
    minIdle = 5
    initialSize = 10
    minEvictableIdleTimeMillis = 60000
    timeBetweenEvictionRunsMillis = 60000
    maxWait = 10000
  }
}
```

Running the Application
-----------------------

To run the application, download the repository and unzip it or clone the repository to your local machine using the following command:
```
git clone http://github.com/caseyscarborough/homelink.git
```
Run the following commands from a terminal window with the <code>homelink</code> directory as the working directory:
```
grails upgrade  # If your version of Grails is greater than 2.2.2
grails run-app
```

After running the commands, you can navigate to [http://localhost:8080/homelink][homelink] in your web browser to see the application in action.

Using the Application
---------------------

After opening the HomeLink application in the browser, you can login using the username <code>casey</code> and the password <code>password</code> to view the application with sample data populated, or you may create your own account and populate your own.

As of now, there are two main sections, Shopping and Reminders.

### Shopping

The shopping section is a place used to keep track of all of your shopping lists. Lists are added through the small AJAX form at the bottom of the page. Each list is added to the 'accordion' group, and from there you may add items to that list from the small form inside. Lists and items can be deleted by clicking the &times; symbol next to the item or list.

### Reminders

The reminders section, not surprisingly, is used to keep track of reminders. The page displays a list of all of your reminders from oldest to newest. You click the reminders to view more information about them or click the &times; symbol to delete them. New reminders can be created using the form at the bottom of the page. If a reminder has 'expired', or if the remind date is past the current date, the date will be displayed in red.

### Todos

The todos section is very similar in layout to the shopping section. You can create todo lists, and add items to each one using the forms provided. Lists or items can be deleted in the same way as before, by clicked its respective &times; symbol.

### Email Functionality

If you'd like the application to send emails, you must change the settings for the mail plugin in the <code>grails-app/conf/Config.groovy</code> file around line 70 (shown below). 

```groovy
grails {
  mail {
    host = "smtp.gmail.com"
    port = 465
    username = "yourusername@gmail.com"
    password = "yourpassword"
    props = ["mail.smtp.auth":"true",
         "mail.smtp.socketFactory.port":"465",
         "mail.smtp.socketFactory.class":"javax.net.ssl.SSLSocketFactory",
         "mail.smtp.socketFactory.fallback":"false"]
  }
}
```
These settings are currently set up for a Gmail account, and the only settings you need to change are the username and password fields. Change these to your Gmail address and password and users will be able receive automated emails from the application.

View more information on using the mail plugin at [http://grails.org/plugin/mail][grails-mail].

[screenshot1]: https://github.com/caseyscarborough/homelink/raw/master/img/main.png "The application's main layout."
[homelink]: http://localhost:8080/homelink
[grails-mail]: http://grails.org/plugin/mail