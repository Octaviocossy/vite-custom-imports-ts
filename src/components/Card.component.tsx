import { randomNumber } from '@utilities';

const Card = () => {
  return (
    <div>
      <p>Random number!!! {`-> ${randomNumber(1, 100)}`}</p>
    </div>
  );
};

export default Card;
