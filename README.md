# COMP229-MM2023-Assignment02
Overview: Using the Portfolio Web Site you developed in Assignment 1, restructure the web site to include a secure section of you site that displays a list of contacts.
Instructions :
This Secure Area must include the following components – a user Login View, a Business Contacts List View and an Update View.
1. In addition to your site’s main Nav Bar and page template components, your Login View should include the following components:
  a. A Form that includes a username field, a password field and a Login Button..
  b. The application database will contain a user collection. The single document in the collection will include your username, password, email address and other relevant information. The username and password credentials will be used for authentication. No Registration form is required.
  c. If the user is authenticated, he will be taken to the Business Contacts List View, otherwise he will be redirected back to the Login View if his username and/or password is incorrect.
  d. If a user attempts to access the secure area of your site, they should be redirected back to the Login View.
2. Your Business Contacts List View should include the following components:
  a. An alphabetically sorted list of contacts should appear on this page. The connection to the database you created will display all the contact data in a table. The table will only include The Contact Name, Contact Number and Email Address.
  b. Include an Update Button and a Delete Button at the end of each Row of the Table. The Update button links to the Update View. The Delete Button removes the contact from the database .
3. The Update View will include the following components:
  a. A Form will allow the user to update any contact details (Name, Contact Number, Email Address, etc.) 
  b. The Form will include a Delete Button that will remove the user from the database and return the user to the Contact List View .
  c. The Form will include a Cancel Button that will return the user to the Contact List View.
4. Include Internal Documentation for your site (5 Marks: Internal Documentation):
  a. Ensure you include a comment header for your CSS and JavaScript files that indicate: the File name, Student’s Name, StudentID, and Date.
  b. Ensure you include a section header for all of your HTML structure, CSS style sections, and any JavaScript functions 
  c. Ensure all your code uses contextual variable names that help make the files human-readable.
  d. Ensure you include inline comments that describe your GUI Design
