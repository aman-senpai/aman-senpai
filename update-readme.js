const fs = require('fs');
const Twit = require('twit');

const T = new Twit({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET_KEY,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

T.get('statuses/user_timeline', { screen_name: 'AmanSenpai', count: 5 }, function (err, data) {
  if (err) {
    console.error(err);
    return;
  }

  const tweets = data.map((tweet) => `- ${tweet.text}`).join('\n');

  fs.readFile('README.md', 'utf8', function (err, readmeContent) {
    if (err) {
      console.error(err);
      return;
    }

    const updatedReadme = readmeContent.replace(/<!--START_SECTION:twitter-->(.|\n)*<!--END_SECTION:twitter-->/, `<!--START_SECTION:twitter-->\n${tweets}\n<!--END_SECTION:twitter-->`);

    fs.writeFile('README.md', updatedReadme, 'utf8', function (err) {
      if (err) {
        console.error(err);
        return;
      }

      console.log('README.md updated with latest tweets.');
    });
  });
});
