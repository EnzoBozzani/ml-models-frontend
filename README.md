# Machine Learning Models Frontend

This is a frontend web application for the Machine Learning Models project.

_ML Models consist of a way to users build their own machine learning models, specially image classification ones. There is also an example of a dog breed identifier model._

-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Run](#run)
-   [Deployment](#deployment)

## Prerequisites

This application uses the [Next.js](https://nextjs.org/docs/getting-started) framework with [npm](https://www.npmjs.com/) as the package manager.

Make sure you have the following installed on your machine:

-   [Node.js](https://nodejs.org/en/)
-   [npm](https://www.npmjs.com/)

## Installation

Clone the repository:

```
git clone git@github.com:EnzoBozzani/ml-models-frontend.git
```

Install the required dependencies by running:

```
npm install
```

Setup env variables:

```
NEXT_PUBLIC_SERVER_URL=""
NEXT_PUBLIC_BASE_URL=""

APPID_CLIENT_ID=""
APPID_CLIENT_SECRET=""
APPID_AUTHORIZATION_URL=""
APPID_PROFILE_URL=""
APPID_WELL_KNOW=""

NEXTAUTH_SECRET=""
NEXTAUTH_URL=""

BAM_API_KEY=""
```

### Run

To run the application in development mode:

```
npm run dev
```

This starts your Next.js app’s "development server" on port 3000: [http://localhost:3000](http://localhost:3000)

## Deployment

To build the application for production:

```
npm run build
npm start
```
