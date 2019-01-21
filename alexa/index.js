/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');

const tackHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'talk');
  },
  
  handle(handlerInput) {
    const factArr = data;
    const factIndex = Math.floor(Math.random() * factArr.length);
    const randomFact = factArr[factIndex];
    const speechOutput = GET_FACT_MESSAGE + randomFact;
    
    
    var http = require('http');
    var querystring =require('querystring');
    
    // const 
    
    var post_data = JSON.stringify(handlerInput.requestEnvelope)
    // var post_data = querystring.stringify({
    //                     'wifi_name':'user',
    //                     'code':'123456'
    //             });
    var options = {
        hostname:'backend.teddieapp.com',
        // hostname:'webhook.site',
         port:80,
        // path:'/223fd00c-5fb1-49a8-af02-132fb03320de/',
        path:'/indexx/',
         method:'POST',
         headers: {
              'Content-Type':'application/x-www-form-urlencoded',
              'Content-Length': post_data.length
         }
     };
    var req = http.request(options,function(res){
        console.log('STATUS:'+res.statusCode);
        console.log('HEADERS:'+JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data',function(chunk){
                console.log('BODY:'+chunk);
        });
     });
     try {
       // write data to request body
      req.write(post_data);
      req.end(); 
     }catch (error) {}

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, randomFact)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};

const SKILL_NAME = 'Teddie';
const GET_FACT_MESSAGE = '';
const HELP_MESSAGE = 'You can share anything with me';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const data = [
  'Ok',
  'Thank you for sharing!',
];

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    tackHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
