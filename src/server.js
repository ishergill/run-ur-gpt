// Import dependencies and middlewares 
const express = require("express");
require('dotenv').config();
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");
// openai: is the Node.js library for the OpenAI API.

// Set up the server 

const app = express();
app.use(bodyParser.json());
app.use(cors())
// CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
// CORS or Cross-Origin Resource Sharing in Node. js is a mechanism by which a front-end client can make requests for resources to an external back-end server
// Set up OpenAI endpoint

const configuration = new Configuration({
  apiKey: process.env.RUN_UR_GPT_KEY,
});
// RUN_UR_GPT_KEY is key name in .env file. .env file should be in project root directory - format is below
// RUN_UR_GPT_KEY="YOR-API-KEY"
// openai.createCompletion() function that essentially triggers a call to OpenAI's completions endpoint.
const openai = new OpenAIApi(configuration);
app.post("/chat", async (req, res) => {
  const { prompt } = req.body;
  const completion = await openai.createCompletion({
    model: "text-davinci-003", 
    prompt: prompt,
    max_tokens: 2048,
  });
  res.send(completion.data.choices[0].text);
});
// 'prompt' is coming from axios post - from react js state - its input field value or query or question 
// Start the server ////////////////////

const port = 5555;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});