import React from "react";
import { Outlet } from "react-router";
import LinkItem from "./LinkItem";

export default function App() {
    return (
        <div>
            <LinkItem route={'/'}>
                <h2>Rick and Morty</h2>
            </LinkItem>
            <br />
            <Outlet />
        </div>
    );
}