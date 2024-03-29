import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import { CategoryQuery, CategoryQueryVariables } from "../../__api__/types";

const CATEGORY_QUERY = gql`
  query category($input: CateGoryInput!) {
    category(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
      category {
        ...CategoryParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

interface ICategoryParams {
  slug: string;
}

export const Category = () => {
  const params = useParams<ICategoryParams>();
  const { data, loading } = useQuery<CategoryQuery, CategoryQueryVariables>(
    CATEGORY_QUERY,
    {
      variables: {
        input: {
          page: 1,
          slug: params.slug,
        },
      },
    }
  );

  return <div>category</div>;
};
