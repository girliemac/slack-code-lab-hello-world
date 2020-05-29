const { App } = require('@slack/bolt');

// *** Initialize an app
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});


// *** Greeting to the user who sent a message contains 👋 (:wave: emoji) ***
app.message(':wave:', async({ message, say }) => {
  // *** A message component created with Block Kit Builder (https://api.slack.com/block-kit-builder)

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
});


// *** Handle errors ***

app.error((error) => {
	// Check the details of the error to handle cases where you should retry sending a message or stop the app
	console.error(error);
});


// *** Start the app
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();

