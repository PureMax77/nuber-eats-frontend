import React from "react";
import nuberLogo from "../images/logo.svg";
import { useMe } from "../hooks/useMe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  const { data, loading, error } = useMe();
  return (
    <>
      {!data?.me.verified && (
        <div className="bg-red-500 p-3 text-center text-base text-white">
          <span>이메일 인증이 필요합니다.</span>
        </div>
      )}
      <header className="py-4">
        <div className="w-full px-5 xl:px-0 max-w-screen-xl mx-auto flex justify-between items-center">
          <Link to={"/"}>
            <img src={nuberLogo} className="w-36" alt="Nuber Eats" />
          </Link>
          <span className="text-xs">
            <Link to={"/edit-profile"}>
              <FontAwesomeIcon icon={faUser} />
            </Link>
          </span>
        </div>
      </header>
    </>
  );
};
