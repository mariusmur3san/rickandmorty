import { memo } from 'react';
// import { useImage } from './Hooks';

interface OwnProps {
    id: number;
    name: string;
    imageSrc: string;
}

const CharacterCard = memo(function CharacterCard({
    id,
    name,
    imageSrc,
}: OwnProps) {
    // const { data: src } = useImage(imageSrc);

    return (
        <article className="character">
            <div className="image">
                <img src={imageSrc} />
            </div>
            <div className="details">
                <h2>
                    {name} # {id}
                </h2>
            </div>
        </article>
    );
});

export default CharacterCard;
