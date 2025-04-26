import React, { memo } from "react";
import { Character } from "./Types";

interface OwnProps {
    id: number;
    name: string;
    image: string;
}

const CharacterCard = memo(function CharacterCard(props: OwnProps) {
    const { id, name, image } = props;
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
});

export default CharacterCard;