// const needle = require('needle');
// var request = require('request');
// var http = require('http');

const express = require("express");
const needle = require("needle");
const app = express();
const PORT = process.env.PORT || 8080;

var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream('./stderr.log', {flags : 'w'});
var log_stdout = process.stdout;

var dataExists = "initial";
var stream;

const log4js = require("log4js");
log4js.configure({
  appenders: { cheese: { type: "file", filename: "cheese.log" } },
  categories: { default: { appenders: ["cheese"], level: "info" } },
});

const logger = log4js.getLogger("cheese");

app.listen(0, () =>
{
console.log(`Server running on port ${PORT}`);



test();

(async () => {
  streamConnect(0)
//   test();
    })();

}
);



app.get('/', function(req, res){
    res.send("Hello from the root application URL");
});

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'

const token = "AAAAAAAAAAAAAAAAAAAAAJKTlQEAAAAA8Nd77YrayCQAEZKBetBJ5DrYbOk%3DPVZIviCDQrnxFd8UQ3Sk4dLgalAL91xxa5lCpBH2ougWWBtFCh";

const streamURL = 'https://api.twitter.com/2/tweets/search/stream?expansions=author_id';



// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.end('Hello World!');
//
//
//
//   // request('http://localhost:8080/tweet_data.php?id=' + "1234", function (error, response, body) {
//   //   if (!error && response.statusCode == 200) {
//   //     console.log(body) // Print the google web page.
//   //   } else {
//   //     console.log(error);
//   //   }
//   // })
//
//
//   (async () => {
//   //   streamConnect(0)
//   test();
//    })();
//
// }).listen(8080);


app.get("/posts", async (req, res) => {
  streamConnect(0);
  // try {
  //   const response = await needle(
  //     "get",
  //     "http://localhost:8080/tweet_data.php?id=1234"
  //   );
  //   console.log(response.body);
  //   res.json(response.body);
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).json({ message: "Internal server error" });
  // }
});

function test(){

setInterval(function () {
  try {
const response =  needle(
  "get",
  "https://video.participateme.com?url=" + new Date().toLocaleString("en-Us", {timeZone: 'Asia/Kolkata'})
);

//const d = new Date();
logger.info("test function called " + new Date().toLocaleString("en-Us", {timeZone: 'Asia/Kolkata'}));

if(dataExists != "initial") {
  if(dataExists == "testcalled") {
    logger.info("inside testcalled condition, launching stream again");

    stream.request.abort();
    streamConnect(0);
  }
}
dataExists = "testcalled";
//res.json(response.body);
} catch (err) {

    logger.info("test function called error " + err + new Date().toLocaleString("en-Us", {timeZone: 'Asia/Kolkata'}));
console.log(err);
//res.status(500).json({ message: "Internal server error" });
}

//  element.innerHTML += "Hello"

}, 180000);


}

 function streamConnect(retryAttempt) {
console.log("streamConnect called");

async function start(tweet_id, type) {
  // useless await here
  var response;


  try {

    if(type == "video") {
     response = await needle(
      "get",
      "https://participateme.com/tweet_data_new.php?id=" + tweet_id
    );
  } else if(type == "pdf") {
     response = await needle(
      "get",
      "https://participateme.com/tweet_data_thread_new.php?tweet_id=" + tweet_id
    );
  }
   // console.error(response.body);

   logger.info(response.body + new Date().toLocaleString("en-Us", {timeZone: 'Asia/Kolkata'}));
    console.log(response.body);
    //res.json(response.body);
  } catch (err) {
     // console.error(err);
     logger.info(err + new Date().toLocaleString("en-Us", {timeZone: 'Asia/Kolkata'}));
   console.log(err);
    //res.status(500).json({ message: "Internal server error" });
  }

  //return await myfunction();
}

   stream = needle.get(streamURL, {
    headers: {
      "User-Agent": "v2SampleStreamJS",
      "Authorization": `Bearer ${token}`
    },
    timeout: 20000
  });

  stream.on('data', data => {
    try {
      const json = JSON.parse(data);

      logger.info(json + new Date().toLocaleString("en-Us", {timeZone: 'Asia/Kolkata'}));

      console.log(json);
      //console.error(json);

     // console.error("tweet id is " + json.data.id);

      const txt = "Your video is ready! Download it from here";
      const str = json.data.text;

      const pdf = "@TweetHelperBot compile";
      const pdf1 = "@tweethelperbot compile";
      const download = "@TweetHelperBot download";
      const download1 = "@tweethelperbot download";

      if(str.includes(pdf) || str.includes(pdf1)) {
        console.log("type is compile");
        start(json.data.id, "pdf");
      } else if(str.includes(download) || str.includes(download1)) {
        console.log("type is download video");
        start(json.data.id, "video");
      } else {
        console.log("not matched");
      }




// if(!(str.includes(txt)))
//     start(json.data.id);


  //     try {
  //   const response = await needle(
  //     "get",
  //     "http://localhost:8080/tweet_data.php?id=1234"
  //   );
  //   console.log(response.body);
  //   //res.json(response.body);
  // } catch (err) {
  //   console.log(err);
  //   //res.status(500).json({ message: "Internal server error" });
  // }

      // res.writeHead(200, {'Content-Type': 'text/html'});
      // res.end(json);
      // A successful connection resets retry count.
      retryAttempt = 0;
    } catch (e) {
      // Catches error in case of 401 unauthorized error status.
      if (data.status === 401) {
          logger.info(data + new Date().toLocaleString("en-Us", {timeZone: 'Asia/Kolkata'}));
        console.log(data);
        process.exit(1);
      } else if (data.detail === "This stream is currently at the maximum allowed connection limit.") {
          logger.info(data.detail + new Date().toLocaleString("en-Us", {timeZone: 'Asia/Kolkata'}));
        console.log(data.detail)
        process.exit(1)
      } else {


if(data.length > 10) {
console.log("reason for disconnection is " + data);

  streamConnect(0);

}
else {
  logger.info("data is " + data);
  dataExists = "afterdata";
}

        // Keep alive signal received. Do nothing.
      }
    }
  }).on('err', error => {
    if (error.code !== 'ECONNRESET') {
        logger.info(error.code + new Date().toLocaleString("en-Us", {timeZone: 'Asia/Kolkata'}));
      console.log(error.code);
      process.exit(1);
    } else {
      // This reconnection logic will attempt to reconnect when a disconnection is detected.
      // To avoid rate limits, this logic implements exponential backoff, so the wait time
      // will increase if the client cannot reconnect to the stream.
      setTimeout(() => {
        console.log("A connection error occurred. Reconnecting...")
        logger.info("A connection error occurred. Reconnecting..." + new Date().toLocaleString("en-Us", {timeZone: 'Asia/Kolkata'}));
        streamConnect(++retryAttempt);
      }, 2 ** retryAttempt);
    }
  });
  return stream;
}
