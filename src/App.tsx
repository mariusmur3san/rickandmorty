import React from "react";
import { Outlet } from "react-router";
import LinkItem from "./LinkItem";

export default function App() {
    return (
        <div>
            <LinkItem route={'/'}>
                <h1>Rick and Morty</h1>
            </LinkItem>
            <br />
            <Outlet />
        </div>
    );
}