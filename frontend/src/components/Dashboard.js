import React, { useState, useEffect } from "react";
import useAuth from "./useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import { Container, Form } from "react-bootstrap";

const spotifyWebApi = new SpotifyWebApi({
	clientId: "09629ba1686e4156bfbbf321f979e61a",
});

function Dashboard({ code }) {
	const [search, setSearch] = useState("");
	const [searchResult, setSearchResult] = useState([]);
	const accessToken = useAuth(code);

	useEffect(() => {
		if (!accessToken) return;
		spotifyWebApi.setAccessToken(accessToken);
	}, [accessToken]);

	useEffect(() => {
		if (!search) return setSearchResult([]);
		if (!accessToken) return;

		spotifyWebApi.searchTracks(search).then((res) => {
			console.log(res);
			//res.body.tracks.items
		});
	}, [search, accessToken]);

	return (
		<Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
			<Form.Control
				type="search"
				placeholder="Search Songs/Artists"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			></Form.Control>

			<div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
				Song section
			</div>

			<div>bottom</div>
		</Container>
	);
}

export default Dashboard;
