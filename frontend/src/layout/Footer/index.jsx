import React from "react";

const URL_ADDR = import.meta.env.VITE_APP_URL

const App = (props) => {
  const { mt } = props;
  return (
    <div className={`px-20 grid grid-cols-2 bg-blue-400 text-white mt-${mt} gap-x-24`}>
      <div className="w-full h-48 inline-block ">
        <div className="flex justify-center items-center py-4 px-4">
          <div className="divide-y ml-8">
            <div className="justify-center items-center py-4">
              <p className="inline-block text-center text-2xl">Pixegram</p>
            </div>
            <div className="justify-center items-center py-4">
              <p className="inline-block ">
                An educational platform where users are put into a simulation of an NFT market, with the nuances of modern trends.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-48 grid grid-flow-col grid-cols-3 inline-block justify-start items-start py-4 px-20 gap-1">
        <div className="my-5">
          <p className="font-semibold text-lg mb-3">Explore</p>
          <ul className="grid grid-cols-1">
            <a className="hover:text-gray-200" href={`${URL_ADDR}/search`}>Market</a>
            <a className="hover:text-gray-200" href={`${URL_ADDR}/search`}>Search</a>
            <a className="hover:text-gray-200" href={`${URL_ADDR}/more`}>About Us</a>
          </ul>
        </div>
        <div className="my-5">
          <p className="font-semibold text-lg mb-3">My Account</p>
          <ul className="grid grid-cols-1">
            <a className="hover:text-gray-200" href={`${URL_ADDR}/`}>My assets</a>
          </ul>
        </div>
        <div className="my-5">
          <p className="font-semibold text-lg mb-3">Resource</p>
          <ul className="grid grid-cols-1">
            <a className="hover:text-gray-200" href={`${URL_ADDR}/more`}>Web3 Posts</a>
            <a className="hover:text-gray-200" href={`https://prog-crs.hkust.edu.hk/pgcourse/2021-22/MSBD`}>Intro to our class</a>
          </ul>
        </div>
      </div>
      <div className="mx-10 col-span-2 flex justify-center items-center py-4 px-4">
        <div>
          Copyright ©️ HKUST CSE MSBD5017 GROUP PROJECT 2022
        </div>
      </div>
    </div>
  );
};

export default App;
