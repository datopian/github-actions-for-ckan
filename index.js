const core = require('@actions/core');
const github = require('@actions/github');
const fetch = require('node-fetch');

try {
  const urlToHarvest = core.getInput('url-to-harvest');
  console.log(`URL to harvest: ${urlToHarvest}!`);
  fetch(urlToHarvest)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
    });
  //   const time = (new Date()).toTimeString();
  //   core.setOutput("time", time);
  
} catch (error) {
  core.setFailed(error.message);
}