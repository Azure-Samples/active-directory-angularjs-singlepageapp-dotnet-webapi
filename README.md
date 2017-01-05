---
services: active-directory
platforms: javascript
author: dstrockis
---

Call an Azure AD protected Web API in an AngularJS Single Page App
====================

This sample demonstrates the use of ADAL for JavaScript for securing an AngularJS based single page app, implemented with an ASP.NET Web API backend, that calls another ASP.NET Web API using CORS.

ADAL for Javascript is an open source library.  For distribution options, source code, and contributions, check out the ADAL JS repo at https://github.com/AzureAD/azure-activedirectory-library-for-js.

For more information about how the protocols work in this scenario and other scenarios, see [Authentication Scenarios for Azure AD](http://go.microsoft.com/fwlink/?LinkId=394414).

## How To Run This Sample

Getting started is simple!  To run this sample you will need:
- Visual Studio 2013
- An Internet connection
- An Azure Active Directory (Azure AD) tenant. For more information on how to get an Azure AD tenant, please see [How to get an Azure AD tenant](https://azure.microsoft.com/en-us/documentation/articles/active-directory-howto-tenant/) 
- A user account in your Azure AD tenant. This sample will not work with a Microsoft account, so if you signed in to the Azure portal with a Microsoft account and have never created a user account in your directory before, you need to do that now.

### Step 1:  Clone or download this repository

From your shell or command line:
`git clone https://github.com/Azure-Samples/active-directory-angularjs-singlepageapp-dotnet-webapi.git`

### Step 2:  Register the To Go API Service with your Azure Active Directory tenant

1. Sign in to the [Azure portal](https://portal.azure.com).
2. On the top bar, click on your account and under the **Directory** list, choose the Active Directory tenant where you wish to register your application.
3. Click on **More Services** in the left hand nav, and choose **Azure Active Directory**.
4. Click on **App registrations** and choose **Add**.
5. Enter a friendly name for the application, for example 'To Go API' and select 'Web Application and/or Web API' as the Application Type. For the sign-on URL, enter the base URL for the sample, which is by default `https://localhost:44327`. For the App ID URI, enter https://<your_tenant_name>/ToGoAPI, replacing <your_tenant_name> with the name of your Azure AD tenant. Click on **Create** to create the application.
6. While still in the Azure portal, choose your application, click on **Settings** and choose **Properties**.
7. Find the Application ID value and copy it to the clipboard.

### Step 3:  Configure the To Go API to use your Azure Active Directory tenant

1. Open the solution in Visual Studio 2013.
2. In the ToGoAPI project, open the `web.config` file.
3. Find the app key `ida:Tenant` and replace the value with your AAD tenant name.
4. Find the app key `ida:Audience` and replace the value with the App ID URI you copied from the Azure portal.
5. Also in the ToGoAPI project, open the file `Controllers/ToGoListController.cs`.  In the `[EnableCors...]` attribute, enter the location of the To Do SPA client.  By default it is `https://localhost:44326`.  Make sure to omit the trailing slash.
5. In the TodoSPA project, open the file `App/Scripts/App.js` and locate the declaration of the `endpoints` object.
6. Enter a mapping of the To Go API endpoint location to its resource identifier, or App ID URI.  The name of the property of the `endpoints` object should be the location of the To Go API.  By default, it is `https://localhost:44327/`.  The value of this property should be the App ID URI you copied from the portal.
8. Don't worry about the other configuration values in this file yet, we'll come back to that in a second.
9. Also in the TodoSPA project, open the file `App/Scripts/toGoListSvc.js`.  Replace the value of the `apiEndpoint` variable with the location of your To Go API.  By default, it is `https://localhost:44327/`.

### Step 4:  Register the To Do Single Page Application with your Azure Active Directory tenant

1. Sign in to the [Azure portal](https://portal.azure.com).
2. On the top bar, click on your account and under the **Directory** list, choose the Active Directory tenant where you wish to register your application.
3. Click on **More Services** in the left hand nav, and choose **Azure Active Directory**.
4. Click on **App registrations** and choose **Add**.
5. Enter a friendly name for the application, for example 'To Do SPA' and select 'Web Application and/or Web API' as the Application Type. For the sign-on URL, enter the base URL for the sample, which is by default `https://localhost:44326`. Click on **Create** to create the application.
6. While still in the Azure portal, choose your application, click on **Settings** and choose **Properties**.
7. Find the Application ID value and copy it to the clipboard.
8. Configure Permissions for your application - in the Settings menu, choose the 'Required permissions' section, click on **Add**, then **Select an API**, and type "To Go API" in the text box. Then, click on  **Select Permissions** and select 'Access To Go API'.

### Step 5:  Enable the OAuth2 implicit grant for your application

By default, applications provisioned in Azure AD are not enabled to use the OAuth2 implicit grant. In order to run this sample, you need to explicitly opt in.

1. From the former steps, your browser should still be on the Azure management portal.
2. In your application page, click on **Manifest** to open the inline manifest editor. 
3. Search for the `oauth2AllowImplicitFlow` property. You will find that it is set to `false`; change it to `true` and save the file.

### Step 6:  Configure the To Do SPA to use your Azure Active Directory tenant

1. Open the solution in Visual Studio 2013.
2. In the TodoSPA project, open the `web.config` file.
3. Find the app key `ida:Tenant` and replace the value with your AAD tenant name.
4. Find the app key `ida:Audience` and replace the value with the Application ID from the Azure portal.
5. Also in the TodoSPA project, open the file `App/Scripts/App.js` once again and locate the line `adalAuthenticationServiceProvider.init(`.
6. Replace the value of `tenant` with your AAD tenant name.
7. Replace the value of `clientId` with the Client ID from the Azure portal.

### Step 7:  Run the sample

Clean the solution, rebuild the solution, and run it. 

You can trigger the sign in experience by either clicking on the sign in link on the top right corner, or by clicking directly on the To Do List or To Go List tabs.  Explore the sample by signing in, adding items to the To Do List, removing the user account, and starting again.  Add places to the To Go List, performing CRUD operations against the To Go API using CORS.

## How To Deploy This Sample to Azure

To deploy the To Do SPA and To Go API to Azure Web Sites, you will create two web sites, publish each project to a web site, and update both projects to reference the new locations instead of IIS Express.

### Create the To Go API Azure Web Site

1. Sign in to the [Azure portal](https://portal.azure.com).
2. Click New in the top left hand corner, select Web + Mobile --> Web App, select the hosting plan and region, and give your web site a name, e.g. togo-contoso.azurewebsites.net.  Click Create Web Site.
3. Once the web site is created, click on it to manage it.  For this set of steps, download the publish profile and save it.  Other deployment mechanisms, such as from source control, can also be used.

### Create the To Do SPA Azure Web Site

1. Sign in to the [Azure portal](https://portal.azure.com).
2. Click New in the top left hand corner, select Web + Mobile --> Web App, select the hosting plan and region, and give your web site a name, e.g. todo-contoso.azurewebsites.net.  Click Create Web Site.
3. Once the web site is created, click on it to manage it.  For this set of steps, download the publish profile and save it.  Other deployment mechanisms, such as from source control, can also be used.

### Update both projects to use Azure Web Sites

1. In Visual Studio, go to the TodoSPA project.
2. Two changes are needed.  In `App\Scripts\app.js`, replace the property name of the `endpoints` object to the new location of your To Go API, e.g. `https://togo-contoso.azurewebsites.net/`.  In `App\Scripts\toGoListSvc.js`, replace the `apiEndpoint` variable with the same value.
3. In the ToGoAPI project, only one change is needed. In `Controllers\ToGoListController.cs`, update the `[EnableCors...]` attribute to reflect the new location of the To Do SPA, e.g. `https://todo-contoso.azurewebsites.net`.  Once again, make sure to omit the trailing slash.

### Publish the To Go API to Azure Web Sites

1. Switch to Visual Studio and go to the ToGoAPI project.  Right click on the project in the Solution Explorer and select Publish.  Click Import, and import the To Go API publish profile you downloaded.
6. On the Connection tab, update the Destination URL so that it is https, for example https://togo-constoso.azurewebsites.net.  Click Next.
7. On the Settings tab, make sure Enable Organizational Authentication is NOT selected.  Click Publish.
8. Visual Studio will publish the project and automatically open a browser to the URL of the project.  If you see the default web page of the project, the publication was successful.

### Publish the To Do SPA to Azure Web Sites

1. Switch to Visual Studio and go to the TodoSPA project.  Right click on the project in the Solution Explorer and select Publish.  Click Import, and import the To Do SPA publish profile you downloaded.
6. On the Connection tab, update the Destination URL so that it is https, for example https://todo-contoso.azurewebsites.net.  Click Next.
7. On the Settings tab, make sure Enable Organizational Authentication is NOT selected.  Click Publish.
8. Visual Studio will publish the project and automatically open a browser to the URL of the project.  If you see the default web page of the project, the publication was successful.

### Update the To Do SPA Configuration in the Directory Tenant

1. Sign in to the [Azure portal](https://portal.azure.com).
2. On the top bar, click on your account and under the **Directory** list, choose your Active Directory tenant.
2. Click on **More Services** in the left hand nav, and choose **Azure Active Directory**.
3. Click on **App registrations** and select the To Do SPA application.
4. Go to **Settings** --> **Properties**, and update the Sign-On URL to the address of your SPA, for example https://todo-contoso.azurewebsites.net.
5. Go to **Settings** --> **Reply URLs** and update the Reply URL field to the address of your SPA, for example https://todo-contoso.azurewebsites.net.

## About the Code

The key files containing authentication logic are the following:

**App.js** - injects the ADAL module dependency, provides the app configuration values used by ADAL for driving protocol interactions with AAD and indicates which routes should not be accessed without previous authentication.

**index.html** - contains a reference to adal.js

**HomeController.js**- shows how to take advantage of the login() and logOut() methods in ADAL.

**UserDataController.js** - shows how to extract user information from the cached id_token.
   
Special thanks to @matvelloso for the assist in getting this sample out.