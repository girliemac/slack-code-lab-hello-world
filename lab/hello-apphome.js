// Require the Bolt package (github.com/slackapi/bolt)
const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// *** App Home tab
app.event('app_home_opened', async ({ ack, event, context }) => {
  console.log(event);
  
  const blocks = [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `Hello, <@${event.user}>! :tada:`
      },
      "accessory": {
        "type": "image",
        "image_url": "https://placekitten.com/300/",
        "alt_text": "kitten"
      }
    }
  ];
  
  app.client.views.publish({
    token: context.botToken,
    user_id: event.user,
    view: {
	    type: 'home',
      title: {
        type: 'plain_text',
        text: 'Hello world!'
      },
	    blocks: blocks
    }
  });
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


(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();