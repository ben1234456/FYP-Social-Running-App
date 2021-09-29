# Social Running App

## Note: 
### 1. Please make sure you have installed composer (application level package manager for PHP programming)
### 2. For Android, please use an Android emulator
### 3. If you cannot sign-up an account, please refer to "Setting up development server" > "3" 

## Setting up front-end (first time)

1. Go to the front-end directory
- `cd app-frontend`

2. run npm install to install the required packages
- `npm install`


## Setting up back-end (first time)

1. Go to the back-end directory
- `cd app-backend`

2. Install composer
- `composer install`

3. run npm install to install the required packages
- `npm install`

4. generate an .env file (if there is no one)
- `cp .env.example .env`

5. configure .env file for database and mail

6. generate an unique key and paste it in the env file 
> `APP_KEY=YOURKEY`

## Setting up database (first time)

1. Make sure the configuration in .env file is correct

2. Go to the back-end directory
- `cd app-backend`

3. Run the migrations
- `php artisan migrate`

## Setting up development server

1. Setting up front-end development server
- `cd app-frontend`
- `npm start`

2. Setting up back-end development server (open another terminal)
- `cd app-backend`
- `php artisan serve`

3. Setting up back-end development server with your machine ip address(open another terminal). The reason of this is that ip 10.0.0.2 cannot be used for email-verification
- `cd app-backend`
- `php artisan serve --host=yourip`

After that, search a file called "SignUpScreen". Control + F to search a variable called "ip"
Finally, replace the ip there with your ip.
> var ip = 'yourip';
