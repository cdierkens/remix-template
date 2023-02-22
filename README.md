# Welcome to Remix!

- [Remix Docs](https://remix.run/docs)

## Install Software

> _Note: This template assumes you are developing on MacOS._

### Volta

We use volta to manage and install node and yarn.

```sh
curl https://get.volta.sh | bash
```

Read more at https://cloud.google.com/sdk/docs/install

### Install Node and Yarn Classic

```sh
volta install node
volta install yarn
```

### Install GCP Cli

```sh
brew install --cask google-cloud-sdk
```

Read more at https://cloud.google.com/sdk/docs/install

### Install pulumi

```sh
brew install pulumi/tap/pulumi
```

https://www.pulumi.com/docs/get-started/install/

## Bootstrap Project

1. Create a GCP Project for the application
1. Find and replace all instances of `remix-template` with the name of your project.
1. Manually create a bucket for your pulumi state (`<project-name>-pulumi-state`)
   - Single Region, standard class, no protection tools.
1. Enable the "Identity Platform API"
   - https://console.cloud.google.com/marketplace/details/google-cloud-platform/customer-identity
1. Add an Email/Password provider without Passwordless login
   - https://console.cloud.google.com/customer-identity/providers

#### Setup gcloud and Pulumi.

```sh
gcloud config set project remix-template
gcloud auth application-default login
gcloud auth login
gcloud auth configure-docker
gcloud services enable cloudkms.googleapis.com run.googleapis.com sqladmin.googleapis.com sql-component.googleapis.com
yarn pulumi login gs://<project-name>-pulumi-state
yarn pulumi config set gcp:project remix-template
gcloud kms keyrings create <project-name>-keyring --location us-central1
gcloud kms keys create <project-name>-key --keyring <project-name>-keyring --location us-central1 --purpose "encryption"
yarn pulumi stack init --secrets-provider="gcpkms://projects/<project-name>/locations/us-central1/keyRings/<project-name>-keyring/cryptoKeys/<project-name>-key"
```

## Development

`
Start the Remix development asset server and the Express server by running:

```sh
yarn dev
```

This starts your app in development mode, which will purge the server require cache when Remix rebuilds assets so you don't need a process manager restarting the express server.

## Deployment

```sh
yarn deploy
```
