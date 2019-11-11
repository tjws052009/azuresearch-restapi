const nconf = require('nconf');

const AzureSearchClient = require('./AzureSearchClient.js');

var query = "*&$count=true";
// var query = "historic&$filter=Rating gt 4&";

function getAzureConfiguration() {
  const config = nconf.file({ file: 'azure_search_config.json' });
  if (config.get('serviceName') === '[SEARCH_SERVICE_NAME]') {
      throw new Error("You have not set the values in your azure_search_config.json file.Change them to match your search service's values.");
  }
  return config;
}

const run = async () => {
  try {
      const cfg = getAzureConfiguration();
      const client = new AzureSearchClient(cfg.get("serviceName"), cfg.get("adminKey"), cfg.get("queryKey"), cfg.get("indexName"));
      
      const result = await client.queryAsync(query);
      const body = await result.json();
      const str = JSON.stringify(body, null, 4);
      console.log(`Query: ${query} \n ${str}`);
  } catch (x) {
      console.log(x);
  }

}

run();