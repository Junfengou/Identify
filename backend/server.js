const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/refresh", (req, res) => {
	const refreshToken = req.body.refreshToken;
	console.log("hi");
	const spotifyApi = new SpotifyWebApi({
		redirectUri: "http://localhost:3000",
		clientId: "09629ba1686e4156bfbbf321f979e61a",
		clientSecret: "8df759f9c73a42a398bede9282457b44",
		refreshToken,
	});

	spotifyApi
		.refreshAccessToken()
		.then((data) => {
			res.json({
				accessToken: data.body.accessToken,
				expiresIn: data.body.expiresIn,
			});
		})
		.catch((err) => {
			console.log(err);
			res.sendStatus(400);
		});
});

// ---------------------------------------------------->

app.post("/login", (req, res) => {
	const code = req.body.code;
	const spotifyApi = new SpotifyWebApi({
		redirectUri: "http://localhost:3000",
		clientId: "09629ba1686e4156bfbbf321f979e61a",
		clientSecret: "8df759f9c73a42a398bede9282457b44",
	});

	spotifyApi
		.authorizationCodeGrant(code)
		.then((data) => {
			res.json({
				accessToken: data.body.access_token,
				refreshToken: data.body.refresh_token,
				expiresIn: data.body.expires_in,
			});
		})
		.catch((err) => {
			console.log(err);
			res.sendStatus(400);
		});
});

app.listen(3001);
