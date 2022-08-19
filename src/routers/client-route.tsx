import { Route, Routes } from "react-router-dom";

import { NotFound } from "../pages/404";
import { Restaurants } from "../pages/client/restaurants";
import { ConfirmEmail } from "../pages/user/confirm-email";
import { EditProfile } from "../pages/user/edit-profile";
import { meQuery_me } from "../__generated__/meQuery";

type ClientInput = {
  me: meQuery_me;
};

export const ClientRoute: React.FC<ClientInput> = ({ me }) => {
  return (
    <Routes>
      <Route path="/" element={<Restaurants />} />
      <Route path="/confirm" element={<ConfirmEmail />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
