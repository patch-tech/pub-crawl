# pub-crawl

## Using MapQuest for geocoding

`pub-crawl` uses MapQuest's [GeoCoding
API](https://developer.mapquest.com/documentation/geocoding-api/), since it
offers a generous free tier and is easy to use. You'll need to follow their
[Getting Started Guide](https://developer.mapquest.com/documentation/) to create
an account and get an API key.

Once you have an API key, pass this to `pub-crawl` via the environment variable
`MAPQUEST_API_TOKEN`.


## Running `pub-crawl`

`pub-crawl` is a single file, and invoked by `npx ts-node pub_crawler.ts`.
Follow the interactive prompts to get your pub crawl.
