import React from "react";
import { Container } from "react-bootstrap";

const {
	REACT_APP_CLIENT_ID,
	REACT_APP_REDIRECT_URI,
	REACT_APP_SCOPE_STREAMING,
	REACT_APP_SCOPE_Email,
	REACT_APP_SCOPE_PRIVATE,
	REACT_APP_SCOPE_LIBRARY_READ,
	REACT_APP_SCOPE_MODIFY,
	REACT_APP_SCOPE_PLAYBACK_STATE,
	REACT_APP_SCOPE_MODIFY_PLAYBACK,
} = process.env;

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${REACT_APP_REDIRECT_URI}&scope=${REACT_APP_SCOPE_STREAMING}%20${REACT_APP_SCOPE_Email}%20${REACT_APP_SCOPE_PRIVATE}%20${REACT_APP_SCOPE_LIBRARY_READ}%20${REACT_APP_SCOPE_MODIFY}%20${REACT_APP_SCOPE_PLAYBACK_STATE}%20${REACT_APP_SCOPE_MODIFY_PLAYBACK}`;

function Login() {
	return (
		<Container
			className="d-flex justify-content-center align-items-center"
			style={{ minHeight: "100vh" }}
		>
			<a className="btn btn-success btn-lg" href={AUTH_URL}>
				Login with spotify
			</a>
		</Container>
	);
}

export default Login;
