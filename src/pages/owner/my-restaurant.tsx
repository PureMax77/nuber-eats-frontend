import { gql, useMutation, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import {
  DISH_FRAGMENT,
  ORDERS_FRAGMENT,
  RESTAURANT_FRAGMENT,
} from "../../fragments";
import { Dish } from "../../components/dish";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryPie,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory";
import {
  CreatePaymentMutation,
  CreatePaymentMutationVariables,
  MyRestaurantQuery,
  MyRestaurantQueryVariables,
} from "../../__api__/types";
import { Helmet } from "react-helmet";
import { useMe } from "../../hooks/useMe";

const MY_RESTAURANT_QUERY = gql`
  query myRestaurant($input: MyRestaurantInput!) {
    myRestaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
        menu {
          ...DishParts
        }
        orders {
          ...OrderParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
  ${ORDERS_FRAGMENT}
`;

const CREATE_PAYMENT_MUTATION = gql`
  mutation createPayment($input: CreatePaymentInput!) {
    createPayment(input: $input) {
      ok
      error
    }
  }
`;

interface IParams {
  id: string;
}

const chartData = [
  { x: 1, y: 3000 },
  { x: 2, y: 1500 },
  { x: 3, y: 4250 },
  { x: 4, y: 1250 },
  { x: 5, y: 2300 },
  { x: 6, y: 7150 },
  { x: 7, y: 6830 },
  { x: 8, y: 6830 },
  { x: 9, y: 6830 },
  { x: 10, y: 6830 },
  { x: 11, y: 6830 },
];

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

  const onCompleted = (data: CreatePaymentMutation) => {
    if (data.createPayment.ok) {
      alert("Your restaurant is being promoted!");
    }
  };
  const [createPaymentMutation, { loading }] = useMutation<
    CreatePaymentMutation,
    CreatePaymentMutationVariables
  >(CREATE_PAYMENT_MUTATION, {
    onCompleted,
  });

  const { data: userData } = useMe();
  const triggerPaddle = () => {
    if (userData?.me.email) {
      // @ts-ignore
      window.Paddle.Setup({ vendor: 173285 });
      // @ts-ignore
      window.Paddle.Checkout.open({
        product: 838856,
        email: userData.me.email,
        successCallback: (data: any) => {
          createPaymentMutation({
            variables: {
              input: {
                transactionId: data.checkout.id,
                restaurantId: +id,
              },
            },
          });
        },
      });
    }
  };

  return (
    <div>
      <Helmet>
        <title>
          {data?.myRestaurant.restaurant?.name || "Loading..."} | Nuber Eats
        </title>
        <script src="https://cdn.paddle.com/paddle/paddle.js"></script>
      </Helmet>
      <div className="checkout-container"></div>
      <div
        className="  bg-gray-700  py-28 bg-center bg-cover"
        style={{
          backgroundImage: `url(${data?.myRestaurant.restaurant?.coverImg})`,
        }}
      ></div>
      <div className="container mt-10">
        <h2 className="text-4xl font-medium mb-10">
          {data?.myRestaurant.restaurant?.name || "Loading..."}
        </h2>
        <Link
          to={`/restaurants/${id}/add-dish`}
          className=" mr-8 text-white bg-gray-800 py-3 px-10"
        >
          Add Dish &rarr;
        </Link>
        <span
          onClick={triggerPaddle}
          className="cursor-pointer text-white bg-lime-700 py-3 px-10"
        >
          Buy Promotion &rarr;
        </span>
        <div className="mt-10">
          {data?.myRestaurant.restaurant?.menu.length === 0 ? (
            <h4 className="text-xl mb-5">Please upload a dish!</h4>
          ) : (
            <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
              {data?.myRestaurant.restaurant?.menu.map((dish, index) => (
                <Dish
                  key={index}
                  name={dish.name}
                  description={dish.description}
                  price={dish.price}
                />
              ))}
            </div>
          )}
        </div>
        <div className="mt-3 mb-10">
          <h4 className="text-center text-2xl font-medium">Sales</h4>
          <div className="mt-10">
            <VictoryChart
              height={500}
              theme={VictoryTheme.material}
              width={window.innerWidth}
              domainPadding={50}
              containerComponent={<VictoryVoronoiContainer />}
            >
              <VictoryLine
                labels={({ datum }) => `$${datum.y}`}
                labelComponent={
                  <VictoryTooltip
                    style={{ fontSize: 18 }}
                    renderInPortal
                    dy={-20}
                  />
                }
                data={data?.myRestaurant.restaurant?.orders.map((order) => ({
                  x: order.createdAt,
                  y: order.total,
                }))}
                interpolation={"natural"}
                style={{
                  data: {
                    stroke: "blue",
                    strokeWidth: 5,
                  },
                }}
              />
              {/* <VictoryAxis
                style={{ tickLabels: { fontSize: 18, fill: "#4d7c0f" } }}
                dependentAxis
                tickFormat={(tick) => `$${tick}`}
              /> */}
              <VictoryAxis
                tickLabelComponent={<VictoryLabel renderInPortal />}
                style={{
                  tickLabels: {
                    fontSize: 20,
                    angle: 45,
                  },
                }}
                tickFormat={(tick) => new Date(tick).toLocaleDateString("ko")}
              />
            </VictoryChart>
          </div>
        </div>
      </div>
    </div>
  );
};
