var Discordie = require('discordie');
var RiveScript = require('rivescript');

const DisEvents = Discordie.Events;
const client = new Discordie();
const talkback = new RiveScript();

///////////////////////////
var botName = "Edea, "; 
///////////////////////////
// Will process rivescript when someone says "Edea, <message here>"
// Keep a trailing space so it would be forced at the beginning of the message.
// You can also change this to a command, such as "!talk " or "]heymrwilson "


client.connect({
	///////////////////////////
	token: 'tokenhere'
	///////////////////////////
	// Put your App Token here.
});

///////////////////////////
talkback.loadFile("yourrivefilehere.rive", loading_done, loading_error);
///////////////////////////
// Load .rive files here.
// check rivescript documentation for better ways to do this

function loading_done (batch_num) {
    console.log("RIVE: Batch #" + batch_num + " has finished loading!");

    talkback.sortReplies();

    var reply = talkback.reply("local-user", "hello");
    console.log("The bot says: " + reply);

}

function loading_error (error) {
	console.log("Error when loading files: " + error);
}

///////////////////////////
// CONNECT/DISCONNECT for neatness

client.Dispatcher.on(DisEvents.GATEWAY_READY, e => {
	console.log('Connected as: ' + client.User.username);
});

client.Dispatcher.on(Discordie.Events.DISCONNECTED, (e) => {
    console.log("Discord (disconnected): " + e.error);
});
///////////////////////////

///////////////////////////////////////////////
// process the rivescript messages
//////////////////////////////////////////////

client.Dispatcher.on(DisEvents.MESSAGE_CREATE, e => { // when someone makes a message

     	if(e.message.content.includes(botName) == true) {  // if it contains the bot's name,

		var talkToMe = e.message.content; // pull message to variable
		var talkToMeToo = talkToMeToo.replace(botName,'');  // remove bot name from string
     		talkToMeToo = talkToMe.replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase(); //remove symbols

		e.message.channel.sendMessage(talkback.reply("local-user", talkToMeToo)); // proccess with local-user name.

		// for debugging
		console.log('-- Hey, someone talked to me! They said: ' + talkToMe);
		console.log('-- I saw: ' + talkToMeToo);
    		console.log('-- I said: ' + talkback.reply("local-user", talkToMeToo));

     	}

     }

});

///////////////////////////