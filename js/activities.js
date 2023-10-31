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
	// New array of activities and the number of them
	var activ = [
		 { key: 'run', value: 0, distance: 0},
		 { key: 'bike', value: 0, distance: 0},
		 { key: 'walk', value: 0, distance: 0},
		 { key: 'Freestyle', value: 0, distance: 0},
		 { key: 'elliptical', value: 0, distance: 0},
		 { key: 'spinning', value: 0, distance: 0},
		 { key: 'meditation', value: 0, distance: 0},
		 { key: 'swim', value: 0, distance: 0},
		 { key: 'row', value: 0, distance: 0},
		 { key: 'yoga', value: 0, distance: 0},
		 { key: 'Crossfit', value: 0, distance: 0},
		];

	for (let i of tweet_array) { // If tweet matches an activity in activ, then add 1 to the activ array
		for (var key in activ) {
			if (i.activityType == activ[key].key) {
				activ[key].value += 1
				let num = i.distance.toFixed(2)
				if (num > 0) {
					activ[key].distance += Number(num)
				}
				}
			//so it doesnt keep going once done already
			}
		}
	//create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
	 activity_vis_spec = {
	   "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": [ 
			{ "activity": activ[0].key, "amount": activ[0].value},
			{ "activity": activ[1].key, "amount": activ[1].value},
			{ "activity": activ[2].key, "amount": activ[2].value},
			{ "activity": activ[3].key, "amount": activ[3].value},
			{ "activity": activ[4].key, "amount": activ[4].value},
			{ "activity": activ[5].key, "amount": activ[5].value},
			{ "activity": activ[6].key, "amount": activ[6].value},
			{ "activity": activ[7].key, "amount": activ[7].value},
			{ "activity": activ[8].key, "amount": activ[8].value},
			{ "activity": activ[9].key, "amount": activ[9].value},
			{ "activity": activ[10].key, "amount": activ[10].value}
		]
	  },
	  "mark": 'point',
	  "encoding": {
		 "x": {
		 	field: "activity",
		 	type: "nominal",
			axis: {
				title: "Number of Tweets of Each Activity",
			}
		 },
		"y": {
			field: "amount",
			type: "quantitative"
		   }
		 }
	  }

	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

// Changing html elements for activites for number of activites, first, second, and third activites 
	document.getElementById('numberActivities').innerText =  activ.length;
	var sortedActiv = activ.sort((a, b) => b.value - a.value)
	document.getElementById('firstMost').innerText =  sortedActiv[0].key
	document.getElementById('secondMost').innerText =  sortedActiv[1].key
	document.getElementById('thirdMost').innerText =  sortedActiv[2].key

// Changing html elements for longest and shorted activity types among the top 3
	var sort23 = [sortedActiv[0], sortedActiv[1], sortedActiv[2]]
	var sort2 = sort23.sort((a,b) => b.distance - a.distance)
	document.getElementById('longestActivityType').innerText =  sort2[0].key
	document.getElementById('shortestActivityType').innerText = sort2[2].key

// Weekend/weekday (Average across all activities)
	document.getElementById('weekdayOrWeekendLonger').innerText = "Weekends"
	var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	
// Distance from all 3 activites on different days
	var threeDis = []; // Array of each top 3 activity with distance on their day d d

	for (let i of tweet_array) { // Adds distance across top three activites
		if ((i.activityType === sortedActiv[0].key) || (i.activityType === sortedActiv[1].key) || (i.activityType === sortedActiv[2].key)){
			var preday = i.time.getDay()
			var day = days[preday]
			var distance = i.distance
			var activity = i.activityType
			threeDis.push({day, distance, activity})
		}
	}

// Graph that plots each tweet according to their activites and their distances 
	distance_vis_spec = {
		"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	   "description": "A graph of the distances by day of the week for all of the three most tweeted-about activities.",
	   "data": {
			"values": threeDis // Using values from new array that has activity, value, and distance
	   },
	   "mark": 'point',
	   "encoding": {
		  "x": {
			field: "day",
			type: "nominal",
			},

		   "y": {
			 field: "distance",
			 type: "quantitative"
			},
			"color": {
				field: "activity",
				type: "nominal",
			},	 
		   },
 
	   }

	   //Aggregated visual graph that shows what each top-3 activity and its mean distance was on different days
	   agr_vis_spec = {
		"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	   "description": "A graph of the mean distances by day of the week for all of the three most tweeted-about activities.",
	   "data": {
			"values": threeDis
	   },
	   "mark": 'point',
	   "encoding": {
		  "x": {
			field: "day",
			type: "nominal",
			},

		   "y": {
			 aggregate: "mean",
			 field: "distance",
			 type: "quantitative"},

		  "color": {
			 field: "activity",
			 type: "nominal",
			},	  
			 
		   },  
	   }

	   // Used the two graphs as variables to allow the code that lets them switch between button pressing 
		
		var graph1 = document.getElementById("distanceVis");
		var graph2 = document.getElementById("distanceVisAggregated");

	   vegaEmbed('#distanceVis', distance_vis_spec, {actions:false});
	   graph1.style.display = "block"
	   vegaEmbed('#distanceVisAggregated', agr_vis_spec, {actions:false});
	   graph2.style.display = "none"

		document.getElementById('aggregate').addEventListener("click",functionName);

		// Creates the ability to click the button and switch graphs
		function functionName(){
			if (graph1.style.display == "block")
			{
				graph1.style.display = "none";
				graph2.style.display = "block";
				document.getElementsByClassName("btn btn-primary")[0].textContent = "Show activities";
			}
			else {
				graph2.style.display = "none";
				graph1.style.display = "block";
				document.getElementsByClassName("btn btn-primary")[0].textContent = "Show means";
			}

			}
			
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});