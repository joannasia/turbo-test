"use client";

import * as React from "react";

export const Button = ({ text }: { text: string }) => {
	return <button>{text || "btn"}</button>;
};
