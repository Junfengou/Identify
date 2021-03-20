import React, { useState, useEffect } from "react";
import useAuth from "./useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import { Container, Form } from "react-bootstrap";
import Player from "./Player";
import TrackSearchResult from "./TrackSearchResult";
import axios from "axios";

const spotifyWebApi = new SpotifyWebApi({
	clientId: "09629ba1686e4156bfbbf321f979e61a",
});

function Dashboard({ code }) {
	const [search, setSearch] = useState("");
	const [searchResult, setSearchResult] = useState([]);
	const [playingTrack, setPlayingTrack] = useState();
	const [lyrics, setLyrics] = useState("");
	const accessToken = useAuth(code);

	console.log({ accessToken });

	function chooseTrack(track) {
		setPlayingTrack(track);
		setSearch("");
		setLyrics("");
	}

	useEffect(() => {
		if (!accessToken) return;
		spotifyWebApi.setAccessToken(accessToken);
	}, [accessToken]);

	// ------------------------------------>

	useEffect(() => {
		if (!search) return setSearchResult([]);
		if (!accessToken) return;

		let cancel = false;

		spotifyWebApi.searchTracks(search).then((res) => {
			if (cancel) return;
			setSearchResult(
				res.body.tracks.items.map((track) => {
					const smallestAlbumImages = track.album.images.reduce(
						(smallest, image) => {
							if (image.height < smallest.height) return image;
							return smallest;
						},
						track.album.images[0]
					);
					return {
						artist: track.artists[0].name,
						title: track.name,
						uri: track.uri,
						// albumUrl: track.albumUrl.images,
						albumUrl: smallestAlbumImages.url,
					};
				})
			);
		});
		return () => (cancel = true); // only validate the request after typing
	}, [search, accessToken]);

	//---------------------------------------------------------------------------------->
	useEffect(() => {
		if (!playingTrack) return;

		axios
			.get("http://localhost:3001/lyrics", {
				params: {
					track: playingTrack.title,
					artist: playingTrack.artist,
				},
			})
			.then((res) => {
				setLyrics(res.data.lyrics);
			});
	}, [playingTrack]);

	return (
		<Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
			<Form.Control
				type="search"
				placeholder="Search Songs/Artists"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			></Form.Control>

			<div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
				{searchResult.map((track) => (
					<TrackSearchResult
						track={track}
						key={track.uri}
						chooseTrack={chooseTrack}
					/>
				))}
				{searchResult.length === 0 && (
					<div className="text-center" style={{ whiteSpace: "pre" }}>
						{lyrics}
					</div>
				)}
			</div>

			<Player accessToken={accessToken} trackUri={playingTrack?.uri} />
		</Container>
	);
}

export default Dashboard;
