import React from "react";
import LinkItem from "./LinkItem";

export default function CharacterCard({ id, name, image }) {
    return (
        <article className='character'>
            <div className='image'>
                <img src={image} />
            </div>
            <div className='details'>
                <h2>{name} # {id}</h2>
            </div>
        </article>
    );
}