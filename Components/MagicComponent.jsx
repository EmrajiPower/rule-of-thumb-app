import { memo } from "react";
import celebrityData from "../assets/data.json";

import Head from "next/head";
import Image from "next/image";

import { withSize } from "react-sizeme";

function MagicComponent({ size }) {
  let propsSize = size.width;
  let handleImgSizes = propsSize >= 768 ? 320 : 200;
  let handlePaddingButtons = propsSize >= 768 ? "1rem" : "0";
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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {celebrityData.data.map(
          ({ name, picture, description, lastUpdated, category }, index) => {
            return (
              <div
                key={index}
                style={{
                  position: "relative",
                  textAlign: "center",
                  display: "flex",
                  margin: "1rem auto",
                }}
              >
                <Image
                  width={handleImgSizes}
                  height={handleImgSizes}
                  src={`/${picture}`}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "16rem",
                    color: "white",
                  }}
                >
                  <h3 style={{ textAlign: "left" }}>{name}</h3>
                  <label style={{ textAlign: "center", margin: "0.5rem auto" }}>
                    {description.match(/.{1,48}/g)[0] + "..."}
                  </label>
                  <label style={{ textAlign: "right", margin: "0.5rem auto" }}>
                    {new Date().getMonth() -
                      new Date(lastUpdated).getMonth() +
                      12 *
                        (new Date().getFullYear() -
                          new Date(lastUpdated).getFullYear())}
                    {""} month ago in {category}
                  </label>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <button
                      className="icon-button"
                      id="action-celebrity"
                      aria-label="thumbs up"
                    >
                      <Image
                        height={20}
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
                        height={20}
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
