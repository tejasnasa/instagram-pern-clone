import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <main className="bg-black text-white pl-[400px] pr-48 min-h-dvh w-dvw text-center">
      <h1 className="text-2xl ml-auto mr-auto font-semibold pt-4 pb-6">
        Sorry, this page isn't available.
      </h1>
      <h3>
        The link you followed may be broken, or the page may have been removed.&nbsp; 
        <Link to={"/"}>Go back to Instagram.</Link>
      </h3>
    </main>
  );
};

export default NotFoundPage;
