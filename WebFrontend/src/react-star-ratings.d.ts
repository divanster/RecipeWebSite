declare module 'react-star-ratings' {
  import * as React from 'react';

  interface StarRatingsProps {
    rating: number;
    starRatedColor?: string;
    changeRating?: (newRating: number, name?: string) => void;
    numberOfStars?: number;
    name?: string;
    starDimension?: string;
    starSpacing?: string;
  }

  class StarRatings extends React.Component<StarRatingsProps> {}

  export default StarRatings;
}
