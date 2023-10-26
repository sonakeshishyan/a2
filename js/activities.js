function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.
	var activ = [// New array of activities and the number of them
		 { key: 'run', value: 0 },
		 { key: 'bike', value: 0 },
		 { key: 'walk', value: 0 },
		 { key: 'Freestyle', value: 0 },
		 { key: 'elliptical', value: 0 },
		 { key: 'spinning', value: 0 },
		 { key: 'meditation', value: 0 },
		 { key: 'swim', value: 0 },
		 { key: 'row', value: 0 },
		 { key: 'yoga', value: 0 },
		 { key: 'Crossfit', value: 0 },
		];

	for (let i of tweet_array) { // If tweet matches an activity in activ, then add 1 to the activ array
		for (var key in activ) {
			if (i.activityType === activ[key]) {
				activ[key].value += 1
				break //so it doesnt keep going once done already
			}
		}

	}

	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": activ
	  }
	  //TODO: Add mark and encoding
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});
	document.getElementById('numberActivities').innerText =  activ.length;
	var sortedActiv = activ.sort((a, b) => a.value - b.value);
	document.getElementById('firstMost').innerText =  sortedActiv[0].key
	document.getElementById('secondMost').innerText =  sortedActiv[1].key
	document.getElementById('thirdMost').innerText =  sortedActiv[2].key

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});