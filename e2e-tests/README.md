# TEMPLATE CCD End2End Journey Tests

## Purpose

This service is to help people to run End2End Journey Tests for their service,
without needing to start from scratch.

The repo consists of Cucumber test scenarios for testing different cases.
These use Protractor to interact with a Chrome browser (via Puppeteer), which runs without
showing the browser (i.e. headless) by default.

## Getting Started

### Prerequisites

Running the application requires the following tools to be installed in your environment:

- [Node.js](https://nodejs.org/) v7.2.0 or later
- [yarn](https://yarnpkg.com/)

### Install dependencies

Install dependencies by executing the following command:

```bash
$ yarn install
```

### Running the tests

The tests will need to be given valid credentials for a Case Worker, supplied by
setting the environment variables `TEST_CASEOFFICER_USERNAME` and `TEST_CASEOFFICER_PASSWORD` and then executing the `e2e` tests, e.g.

```bash
$ TEST_CASEOFFICER_USERNAME=? TEST_CASEOFFICER_PASSWORD=? yarn e2e
```

#### Running the tests against a local prod ccd version

```bash
$ ./bin/local-prod-test.sh
```

#### Running the nightly tests locally against AAT

```bash
$ yarn test:aat
```

If you wish to see the browser running the tests simply set the `TEST_E2E_HEADLESS` environment variable to _false_

### Updating the project for your service

You need to make changes everywhere there is a `TODO:` comment to make it relevant to your service:

- Jenkinsfile_nightly
- service.conf.js

i.e. changing running environment from local to demo or to aat. To run it locally, you need to set docker and other relevant services.

## Running locally

If you have got the latest sscs-docker setup and running you can run all the e2e tests with

```bash
$ TEST_E2E_USE_PROXY=false TEST_E2E_URL_GATEWAY='http://localhost:3453' TEST_E2E_URL_WEB='http://localhost:3451' TEST_JUDGE_USERNAME='judge@example.com' TEST_JUDGE_PASSWORD='Pa55word11' TEST_DWP_USERNAME='dwpuser@example.com' TEST_DWP_PASSWORD='Pa55word11' TEST_E2E_HEADLESS=false TEST_CASEOFFICER_USERNAME='local.test@example.com' TEST_CASEOFFICER_PASSWORD='Pa55word11' yarn e2e
```

to run tests by their scenario tag append the tag in the feature script

```
 --cucumberOpts.tags=@adjournment
```

## Other tasks

To ensure your code is clean (i.e. linting):

```bash
$ yarn lint
```

To perform NSP dependency checks:

```bash
$ yarn test:nsp
```
