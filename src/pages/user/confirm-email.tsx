import { gql, useMutation } from "@apollo/client";
import {
  VerifyEmailMutation,
  VerifyEmailMutationVariables,
} from "../../__api__/types";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;

export const ConfirmEmail = () => {
  const [verifyEmail, { loading: verifyingEmail }] = useMutation<
    VerifyEmailMutation,
    VerifyEmailMutationVariables
  >(VERIFY_EMAIL_MUTATION);

  const location = useLocation();

  useEffect(() => {
    const [, code] = window.location.href.split("code=");
    verifyEmail({
      variables: {
        input: {
          code,
        },
      },
    });
  }, []);

  return (
    <div className="mt-52 flex flex-col items-center justify-center">
      <h2 className="text-lg mb-1 font-medium">이메일 확인...</h2>
      <h4 className="text-gray-700 text-sm">기다려줘, 페이지 닫지마...</h4>
    </div>
  );
};
