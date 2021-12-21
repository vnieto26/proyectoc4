import React from "react";

export default function Cerrar() {
   localStorage.clear();
	window.location = "/";

	return <div></div>;
}
