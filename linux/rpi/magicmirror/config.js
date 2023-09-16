/* MagicMirror² Config Sample
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * see https://docs.magicmirror.builders/configuration/introduction.html
 * and https://docs.magicmirror.builders/modules/configuration.html
 *
 * You can use environment variables using a `config.js.template` file instead of `config.js`
 * which will be converted to `config.js` while starting. For more information
 * see https://docs.magicmirror.builders/configuration/introduction.html#enviromnent-variables
 */
let config = {
	address: "localhost",	// Address to listen on, can be:
							// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
							// - another specific IPv4/6 to listen on a specific interface
							// - "0.0.0.0", "::" to listen on any interface
							// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/",			// The URL path where MagicMirror² is hosted. If you are using a Reverse proxy
					  		// you must set the sub path here. basePath must end with a /
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"],	// Set [] to allow all IP addresses
															// or add a specific IPv4 of 192.168.1.5 :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
															// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false, 		// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "", 	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "", 	// HTTPS Certificate path, only require when useHttps is true

	language: "en",
	locale: "en-US",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
	timeFormat: 24,
	units: "metric",

	modules: [
		{
			module: "alert",
		},
		{
			module: "updatenotification",
			position: "top_bar"
		},
		{
			module: "clock",
			position: "top_left"
		},
		{
			module: "calendar",
			header: "Upcoming",
			position: "top_left",
			config: {
				calendars: [
					{
						fetchInterval: 7 * 24 * 60 * 60 * 1000,
						symbol: "calendar-check",
						url: "https://calendar.google.com/calendar/ical/shravantr%40gmail.com/private-d9dc0e4721fd5af027d83a77da8106c4/basic.ics",
                        maximumNumberOfDays: 10,
					}
				]
			}
		},
		// {
		// 	module: "compliments",
		// 	position: "bottom_center"
		// },
		{
			module: "weather",
			position: "top_right",
			config: {
				weatherProvider: "weathergov",
				type: "current",
				location: "Philadelphia",
                apiBase: 'https://api.weather.gov/points/',
                lat: 39.951969,
                lon: -75.172653,
				// locationID: "5128581", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				// apiKey: "YOUR_OPENWEATHER_API_KEY"
			}
		},
		{
			module: "weather",
			position: "top_right",
			header: "Weather Forecast",
			config: {
				weatherProvider: "openweathermap",
				type: "forecast",
				location: "New York",
				locationID: "5128581", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				apiKey: "YOUR_OPENWEATHER_API_KEY"
			}
		},
		{
			module: "newsfeed",
			position: "bottom_bar",
			config: {
				feeds: [
					{
						title: "New York Times",
						url: "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml"
					}
				],
				showSourceTitle: true,
				showPublishDate: true,
				broadcastNewsFeeds: true,
				broadcastNewsUpdates: true
			}
		},
        // {
        //     module: 'MMM-EasyBack',
        //     position: 'middle_center',
        //     config: {
        //         bgName: "under-the-skin.jpg",   // "Example.jpg", the file name of your background image (case sensitive)
        //         // videoName: "cathy.mp4",       // "baboon.mp4",         // file name of your local video
        //         youTubeID: "", //"SkeNMoDlHUU", // "So3vH9FY2H4", // ID from any YouTube video. ID comes after the = sign of YouTube url
        //         height: "1080px",    // your display's resolution in pixels. Enter in config.js
        //         width: "1920px",     // your display's resolution in pixels. Enter in config.js
        //     }
        // },
        {
            module: 'MMM-BackgroundSlideshow',
            position: 'fullscreen_below',
            config: {
                imagePaths: ['modules/MMM-BackgroundSlideshow/images/'],
                transitionImages: true,
                randomizeImageOrder: true,
                slideshowSpeed: 60000,
                resizeImages: true,
                maxWidth: 1080,
                maxHeight: 1920,
                backgroundSize: 'contain',
            }
        },
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
