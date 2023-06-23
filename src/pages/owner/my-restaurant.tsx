import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import {
  MyRestaurantQuery,
  MyRestaurantQueryVariables,
} from "../../__api__/types";

const MY_RESTAURANT_QUERY = gql`
  query myRestaurant($input: MyRestaurantInput!) {
    myRestaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

interface IParams {
  id: string;
}

export const MyRestaurant = () => {
  const { id } = useParams<IParams>();
  const { data } = useQuery<MyRestaurantQuery, MyRestaurantQueryVariables>(
    MY_RESTAURANT_QUERY,
    {
      variables: {
        input: { id: +id },
      },
    }
  );
  console.log(data);
  return <h1>My Restaurant</h1>;
};
