import React from "react";

function TrackSearchResult({ track, chooseTrack }) {
	const handlePlay = () => {
		chooseTrack(track);
	};

	return (
		<div
			className="d-flex m-2 align-items-center"
			style={{ cursor: "pointer" }}
			onClick={handlePlay}
		>
			<img src={track.albumUrl} style={{ height: "64px", width: "64px" }} />
			<div className="ml-3">{track.title}</div>
			<div className="text-muted">{track.artist}</div>
		</div>
	);
}

export default TrackSearchResult;
