# Slack App Workshop: Hello world!

*Published: April, 2020*

---

## 🎁 Slides

[![slides](https://cdn.glitch.com/50da2454-06d1-4d5e-92ba-92e1822bed6d%2FScreen%20Shot%202020-05-29%20at%2012.54.05%20PM.png?v=1590782077518)](https://docs.google.com/presentation/d/e/2PACX-1vTrObtV4qJ60pEmIIcSKQkR6Fuyas4gfMTkuXZstXqFR_sWKPj1y7y0YEjfOJuLInhEjFbdUcVlrXFV/pub?start=false&loop=false&delayms=3000)


## ⚙️ Configuring your Slack app with App Management

### 1. Create an app

<a href="https://api.slack.com/apps?new_app=1&ref=workshop-glitch" target="_blank"><img src="https://cdn.glitch.com/b0065ebc-aa72-44cf-a442-65a76aff7ffd%2Fcreate_app_button_medium.png?v=1584382862390" alt="create an app"></a>

Once you created, scroll at the **Basic Information** and see what you have here. 
You can set up with your app icons etc, as well as your app credentials. We'll come back here later!

![screenshot](https://cdn.glitch.com/50da2454-06d1-4d5e-92ba-92e1822bed6d%2Fcreate-app.png?v=1585172878723)

### 2. Add scopes & Install once

We need to set up the permission scope so that your app can sends messages to public channels.
Go to Features > **OAuth & Permissions** from the side menu, scowrn to **Scopes** and add the `chat:write` scope. 

![screenshot](https://cdn.glitch.com/50da2454-06d1-4d5e-92ba-92e1822bed6d%2Fscopes.png?v=1585172829744)

Once added, scroll up to the top of the page and install the app once. 

Notice the OAuth screen where you are notified that the app is requesting permission to access the Slack workspace to send messages as a bot user.

![screenshot](https://cdn.glitch.com/50da2454-06d1-4d5e-92ba-92e1822bed6d%2Finstall-oauth.png?v=1585172822078)


### 3. Access token

Now you should have your token generated. This is the OAuth token to authenticate you app upon each API call.

![screenshot](https://cdn.glitch.com/50da2454-06d1-4d5e-92ba-92e1822bed6d%2Ftoken.png?v=1585172890686)

### 4. Set up your environmental variables

Copy the token and paste it into **.env** file on this Glitch repo!
![screenshot](https://cdn.glitch.com/50da2454-06d1-4d5e-92ba-92e1822bed6d%2Fglitch-env.png?v=1585172905163)


Also, go back to **Basic Information** senction in the Slack App Management you saw in the beginning, scrol down to **App Credentials**, then copy the *Signing Secret* and paste it in the **.env**.
![screenshot](https://cdn.glitch.com/50da2454-06d1-4d5e-92ba-92e1822bed6d%2Fcredentials.png?v=1585172897834)


### 5. Enable events

Now you need to tell Slack where your app endoint to receive the event payloads.

![screenshot](https://cdn.glitch.com/50da2454-06d1-4d5e-92ba-92e1822bed6d%2Fevent-subscription.png?v=1585172915882)

1. Go back to the app settings and click on **Event Subscriptions** on the left side navigation
2. Enable events and enter your Request URL: 
  - When you're running your app from Glitch, your URL should look something like `https://my-stuff.glitch.me/slack/events` (where `my-stuff` should be replaced with your own project name, either assigned by Glitch or your custom name!)
3. After you set up the Request URL, you should add event subscriptions under the Subscribe to Bot Events. Add `message.channel`. Then Save.

![screenshot](https://cdn.glitch.com/50da2454-06d1-4d5e-92ba-92e1822bed6d%2Fevents.png?v=1585172880084)

Notice that adding the event to send messages to channels requires a scope, `channels.history`. 
Since Slack automatically add the scope to your setting, you don't need to manually add it by yourself, however, you need to reinstall the app. 

Every time you change the permission scopes, you need to reinstall your app!

![screenshot](https://cdn.glitch.com/50da2454-06d1-4d5e-92ba-92e1822bed6d%2Freinstall.png?v=1585172900517)


## ⌨️ Building an app with Bolt

### Excercise 1. Hello world

Run the `app.js`.

1. Open Slack client
2. Invite your bot `/invite @hello_world`
3. Post a message containing `:wave:`

Did your bot send a message that say "Hello, [your name]! :tada:"?

### Excercise 2. Format messages with Block Kit 

Begin with your `app.js` and tweak the code.

1. Build a message using [Block Kit Builder](https://api.slack.com/block-kit-builder) WYSIWYG tool.
2. Copy the generate JSON and replace the string in the `say()` method with the JSON.
3. Tweak the message text with `Hello, <@${message.user}>! :tada:` so it still sends a message with the username.

```js
  const blocks = {
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `Hello, <@${message.user}>! :tada:`
        },
        "accessory": {
          "type": "image",
          "image_url": "https://placekitten.com/300/",
          "alt_text": "kitten"
        }
      }
    ]
  };
  
  say(blocks);
```

### Excercise 3. Adding App Home

#### Add an event

1. Go back to your Slack App Management page to navigate to **Event subscriptions**
2. Add `app_home_opened` and save.


---

Feeling stuck?
You can take a look at the `/lab` directory for the complete code!


🦄 I hope you enjoyed the workshop, and happy coding!