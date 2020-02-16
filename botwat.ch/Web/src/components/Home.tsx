import React from "react";
import {authenticationService} from "../services/authentication.service";

export default function Home() {
    return (
        <p>Welcome {authenticationService.currentUserValue.name}</p>
    );
}