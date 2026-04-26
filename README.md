# repair_website

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Firebase

### Cors issues due to permissions
When using firebase cloud functions, you need to set up IAM cloud run permissions. This can be done via the gcloud cli or the dashboard linked here:

//[text](https://console.cloud.google.com/run?project=repair-website-backend-2a41)

### Usefull commands

firebase emulators:start
firebase deploy --only functions:<your function name>

## Telegram Bot

### Bot father not reading new texts
The telegram bot setup is very easy, you only need to create a new bot with bot father. When creating the bot in the bot father chat, sometimes the texts you send do not go through and in that case, you can reply to any prior text in the chat with your input for the latest quesitons bot father asked and this will allow the chat to progress.