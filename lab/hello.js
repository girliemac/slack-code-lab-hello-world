const { App } = require('@slack/bolt');

// *** Initialize an app
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// *** Greeting to the user who sent a message contains 👋 (:wave: emoji) ***
// *** message() is the wrapper for this event listener + the method that sends a message to a channel

app.event('message', async({ event, say }) => {  
  console.log(event);
  const {text, user} = event;
  
  if (/:wave:/i.test(text)) {   
    // Respond to the message back in the same channel
    // Bolt's say() method calls Slack Web API, chat.postMessage
    say(`Hello, <@${user}>! :tada:`);
  }
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