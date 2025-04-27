import { memo } from 'react';

interface OwnProps {
  id: number;
  name: string;
  image: string;
}

const CharacterCard = memo(function CharacterCard({
  id,
  name,
  image,
}: OwnProps) {
  return (
    <article className="character">
      <div className="image">
        <img src={image} />
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
