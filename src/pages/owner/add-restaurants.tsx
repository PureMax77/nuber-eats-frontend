import { gql, useApolloClient, useMutation } from "@apollo/client";
import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import { Helmet } from "react-helmet";
import {
  CreateRestaurantMutation,
  CreateRestaurantMutationVariables,
} from "../../__api__/types";
import { FormError } from "../../components/form-error";
import { MY_RESTAURANTS_QUERY } from "./my-restaurants";
import { useHistory } from "react-router-dom";

const CREATE_RESTAURANT_MUTATION = gql`
  mutation createRestaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      error
      ok
      restaurantId
    }
  }
`;

interface IFormProps {
  name: string;
  address: string;
  categoryName: string;
  file: FileList;
}

export const AddRestaurant = () => {
  const client = useApolloClient();
  const history = useHistory();
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const onCompleted = async (data: CreateRestaurantMutation) => {
    const {
      createRestaurant: { ok, restaurantId },
    } = data;
    if (ok) {
      const { name, categoryName, address } = getValues();
      setUploading(false);
      const queryResult = await client.readQuery({
        query: MY_RESTAURANTS_QUERY,
      });
      if (queryResult) {
        client.writeQuery({
          query: MY_RESTAURANTS_QUERY,
          data: {
            myRestaurants: {
              ...queryResult.myRestaurants,
              restaurants: [
                {
                  address,
                  category: {
                    name: categoryName,
                    __typename: "Category",
                  },
                  coverImg: imageUrl,
                  id: restaurantId,
                  isPromoted: false,
                  name,
                  __typename: "Restaurant",
                },
                ...queryResult.myRestaurants.restaurants,
              ],
            },
          },
        });
      }
      history.push("/");
    }
  };

  const [createRestaurantMutation, { loading, data }] = useMutation<
    CreateRestaurantMutation,
    CreateRestaurantMutationVariables
  >(CREATE_RESTAURANT_MUTATION, {
    onCompleted,
  });

  const { register, getValues, formState, handleSubmit } =
    useForm<IFormProps>();

  const onSubmit = async () => {
    try {
      setUploading(true);
      const { file, name, categoryName, address } = getValues();
      const actualFile = file[0];
      const formBody = new FormData();
      formBody.append("file", actualFile);
      const { url: coverImg } = await (
        await fetch("http://localhost:4000/uploads/", {
          method: "POST",
          body: formBody,
        })
      ).json();
      setImageUrl(coverImg);
      createRestaurantMutation({
        variables: {
          input: {
            name,
            categoryName,
            address,
            coverImg,
          },
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container flex flex-col items-center mt-52">
      <Helmet>
        <title>Add Restaurant | Nuber Eats</title>
      </Helmet>
      <h4 className="font-semibold text-2xl mb-3">Add Restaurant</h4>
      <form
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register("name", { required: "Name is required." })}
          className="input"
          type="text"
          placeholder="Name"
        />
        <input
          {...register("address", { required: "Address is required." })}
          className="input"
          type="text"
          placeholder="Address"
        />
        <input
          {...register("categoryName", {
            required: "Category Name is required.",
          })}
          className="input"
          type="text"
          placeholder="Category Name"
        />
        <div>
          <input
            {...register("file", { required: true })}
            type="file"
            accept="image/*"
          />
        </div>
        <Button
          loading={uploading}
          canClick={formState.isValid}
          actionText="Create Restaurant"
        />
        {data?.createRestaurant.error && (
          <FormError errorMessage={data.createRestaurant.error} />
        )}
      </form>
    </div>
  );
};
