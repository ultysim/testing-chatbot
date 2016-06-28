//get BotKit to spawn bot
var Botkit = require('botkit');

var Parse = require('parse/node');
Parse.initialize('AppId123','unused');
Parse.serverURL = 'http://claireparseserver-dev.us-west-2.elasticbeanstalk.com/parse';

var VERIFY_TOKEN='my_voice_is_my_password_verify_me';
var PAGE_TOKEN='EAAYzkbZAR65YBALnqlvRoj4ZCfWoZAlSd3IZCZBJCBZCI30mt89Kd89PL9i5G4BXIuKWi0fEop4yK17QfetZBioBTnSQHcZCsnZADdZBZBrb604BAhbNZAOJMsqsZAaoGXN1RnTdY25sZBPvWroZBCiGRa6cEZAjnYJ4JEZCIt5ZCZCZB0lElVtelgZDZD';
exports.handler = (event, context, callback) => {
var controller = Botkit.facebookbot({
    debug: false,
    access_token: PAGE_TOKEN,
    verify_token: VERIFY_TOKEN,
});
console.log('controller');

var TestEvent = Parse.Object.extend("Test123");

var bot = controller.spawn({});

console.log('check bot');
//prepare the webhook
controller.setupWebserver(process.env.PORT || 5000, function(err, webserver) {
    controller.createWebhookEndpoints(webserver, bot, function() {
        console.log('This bot is online!!!');
        testEvent = new TestEvent();
        testEvent.set("yas", 0);
        testEvent.set("action", "load");
        testEvent.save()
    });
});
console.log('check setup');
// this is triggered when a user clicks the send-to-messenger plugin
controller.on('facebook_optin', function(bot, message) {

    bot.reply(message, 'Welcome to my app!');

});

// user said hello
controller.hears(['hello'], 'message_received', function(bot, message) {

    bot.reply(message, 'Hey there.');
    
    testEvent = new TestEvent();
    testEvent.set("yas", 1);
    testEvent.set("action", "love");
    testEvent.save()
    console.log('listen');

});


};
console.log('all done');