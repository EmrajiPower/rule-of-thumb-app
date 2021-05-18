import { memo } from "react";
import celebrityData from "../assets/data.json";

import Head from "next/head";
import Image from "next/image";

import { handleTimePeriod } from "./Utils";

import { withSize } from "react-sizeme";

function MagicComponent({ size }) {
  let propsSize = size.width;
  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta
          name="description"
          content="following close to your favorite celebrities? let's make a poll"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <h1>Previous Rulings</h1>
      <div className="flex flex-row flex-wrap">
        {celebrityData.data.map(
          ({ name, picture, description, lastUpdated, category }, index) => {
            return (
              <div
                key={index}
                className="relative text-center flex my-3 mx-auto"
              >
                <Image
                  className="w-96 h-96 md:w-80 md:h-80"
                  width={handleImgSizes}
                  height={handleImgSizes}
                  src={`/${picture}`}
                />
                <div className="flex justify-center flex-col transform -translate-y-2/4 -translate-x-2/4 absolute top-2/4 left-2/4 w-64 text-white">
                  <h3
                    className="text-left font-semibold"
                    style={{ textAlign: "left" }}
                  >
                    {name}
                  </h3>
                  <label className="text-center my-2 mx-auto">
                    {description.match(/.{1,48}/g)[0] + "..."}
                  </label>
                  <label className="text-right my-2 mx-0">
                    {handleTimePeriod(lastUpdated)}
                    {""} month ago in {category}
                  </label>
                  <div className="flex justify-end">
                    <button
                      className="icon-button"
                      id="action-celebrity"
                      aria-label="thumbs up"
                    >
                      <Image
                        height={16}
                        width={24}
                        src="/thumbs-up.svg"
                        alt="thumbs up"
                      />
                    </button>
                    <button
                      className="icon-button"
                      id="action-celebrity"
                      aria-label="thumbs down"
                    >
                      <Image
                        height={16}
                        width={24}
                        src="/thumbs-down.svg"
                        alt="thumbs down"
                      />
                    </button>
                    <button aria-label="thumbs down">Vote Now</button>
                  </div>
                  {/* <div className="hero__closing-gauge">
                    <div className="closing-gauge__left">
                      <span className="closing-gauge__title">closing in</span>
                    </div>
                    <div className="closing-gauge__right">
                      <span className="closing-gauge__number">22</span>
                      <span className="closing-gauge__desc">days</span>
                    </div>
                  </div> */}
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

export default memo(withSize()(MagicComponent));
