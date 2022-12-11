# discord-slash-command-with-cloud-functions
Build a Discord Slash Command and deploy Cloud Functions

## Update dependencies

```sh
$ npm run -ws update:check
$ npm run -ws update:apply
```

## Debug for function

```sh
$ npm run -s @scrapbox/function start
$ curl http://localhost:8080/
```

## Deploy to Google Cloud Function

### Prepare(once)

* install [`gcloud`](https://cloud.google.com/sdk/gcloud)
* run `gcloud auth application-default login` for deploying to Google Cloud Function

### Deploy command

```sh
$ npm run -w @scrapbot/function deploy
```

## Reference

* [npm workspacesとモノレポ探検記](https://zenn.dev/suin/scraps/20896e54419069)
* [Cloud Function (非Firebase) に TypeScript のコードをデプロイする](https://blog.n-t.jp/post/tech/cloudfunction-typescript-deploy-notfirebase/)
