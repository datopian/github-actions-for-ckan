const core = require('@actions/core');
const github = require('@actions/github');
const fetch = require('node-fetch');
const { Client } = require('ckan-client');

try {
  const urlToHarvest = core.getInput('url-to-harvest');
  console.log(`URL to harvest: ${urlToHarvest}!`);
  fetch(urlToHarvest)
    .then((res) => res.json())
    .then((json) => {
      const client = new Client(
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiItTlljei1CeXRnT0xabUJpUnU3ZS1QczlsSU15TkhvVGczdE5lZHhFUkxibFlKYkJVektFM3czMjFLcFo1MU5mLXVXOEY2dW0ta3Fya1pweCIsImlhdCI6MTY3NDY0NTAzMn0.ccwchbB7jf8QbEjvDroulwuRPZFWJhKpV0PJJsnTctE',
        '',
        '',
        'https://ckan.x.demo.datopian.com'
      );
      const datasets = json.result.results;
      datasets.forEach((dataset) => {
        dataset.name += '-demo-instance';
        dataset.owner_org = 'test';
        delete dataset.organization;
        delete dataset.id;
        // Groups
        delete dataset.groups;
        // Resources
        dataset.resources = dataset.resources.map((resource) => {
          delete resource.id;
          delete resource.package_id;
          return resource;
        })
        // Tags
        dataset.tags = dataset.tags.map((tag) => {
          delete tag.id;
          return tag;
        })
        // Misc
        delete dataset.creator_user_id;
        client.create(dataset).then((res) => console.log(res.name));
      });
    });
} catch (error) {
  core.setFailed(error.message);
}