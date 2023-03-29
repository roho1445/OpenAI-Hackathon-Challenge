const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

var fs = require('fs');

var global_data = fs.readFileSync("console-out.txt").toString();

let noDouble = global_data.replace(/"/g, '\'');
let noNewLine = noDouble.replace(/\n|\r/g, "");


async function start() {
  let inquiry = "what is wrong with";
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: inquiry.concat(noNewLine),
    temperature: 0,
    max_tokens: 1000,
  });

  var dict = {
    "command_executed": "node answer",
    "error": noNewLine,
    "prompt": inquiry.concat(" + full error message (not shown for clarity)"),
    "output": response.data.choices[0].text
  };

  var dictstring = JSON.stringify(dict,null,'\n');
  const fs = require('fs')


  // Write data in 'Output.txt' .
  fs.writeFile('model.json', dictstring, (err) => {

    // In case of a error throw err.
    if (err) throw err;
  })
}

start()