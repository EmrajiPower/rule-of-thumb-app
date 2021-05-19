import { memo, useEffect, useCallback } from "react";
import { withSize } from "react-sizeme";
import { AppContext } from "./provider/config";
import { HANDLE_STORE_CELEBRITIES, HANDLE_STORE_VOTES } from "./reducers/types";

import celebrityData from "../assets/data.json";

import Image from "next/image";

import { handleTimePeriod } from "./Utils";
import { useAppContext } from "./provider";

function CelebritiesComponent({ size }) {
  const { state, dispatch } = useAppContext();
  let celebritiesStorage = JSON.parse(localStorage.getItem("celebrities"));

  const handleGetCelebrities = useCallback(async () => {
    await dispatch({
      type: HANDLE_STORE_CELEBRITIES,
      payload: celebrityData.data,
    });
  }, []);

  useEffect(() => {
    handleGetCelebrities();
    //Preparando API LocalStorage para almacenar votos
    if (celebritiesStorage && Object.values(celebritiesStorage).length) {
      //   console.log("Pues ahí se va viendo todo: ", {
      //     celebrityList: state.celebrities,
      //     celebritiesStorage,
      //   });
      //   console.log(
      //     "Experimento",
      //     Object.entries(celebritiesStorage).map(([key, value]) => {
      //       return {
      //         key,
      //         value,
      //       };
      //     })
      //   );
    }
  }, []);

  let propsSize = size.width;
  let handleImgSizes = propsSize >= 768 ? 320 : 200;
  let handleBtnHeight = propsSize >= 768 ? 16 : 12;
  let handleBtnWidth = propsSize >= 768 ? 24 : 20;

  return (
    <div className="flex flex-row flex-wrap">
      {state.celebrities.map(
        (
          { name, picture, description, lastUpdated, category, votes },
          index
        ) => {
          //Mostrar un poco de la descripción
          let handleLookDescription = description.match(/.{1,48}/g)[0] + "...";

          //La suma de los votos por persona
          let totalVotes = votes.positive + votes.negative;

          //La cantidad de votos "+"" y "-"" por persona en %
          let totalPositives = ((100 * votes.positive) / totalVotes).toFixed(1);
          let totalNegatives = ((100 * votes.negative) / totalVotes).toFixed(1);
          return (
            <div key={index} className="relative text-center flex my-3 mx-auto">
              <Image
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
                  {handleLookDescription}
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
                      height={handleBtnHeight}
                      width={handleBtnWidth}
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
                      height={handleBtnHeight}
                      width={handleBtnWidth}
                      src="/thumbs-down.svg"
                      alt="thumbs down"
                    />
                  </button>
                  <button
                    aria-label="thumbs down"
                    onClick={() => {
                      //   localStorage.setItem(
                      //     "celebrities",
                      //     JSON.stringify({
                      //       ...celebritiesStorage,
                      //       [name]: {
                      //         votes: {
                      //           positive: votes.positive,
                      //           negative: votes.negative,
                      //         },
                      //       },
                      //     })
                      //   );
                      dispatch({
                        type: HANDLE_STORE_VOTES,
                        payload: 1,
                      });
                    }}
                  >
                    Vote Now
                  </button>
                </div>
              </div>
              <div className="flex flex-row justify-center">
                <div
                  style={{
                    positive: "absolute",
                    left: 0,
                    bottom: "0",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    position: "absolute",
                  }}
                  className="h-10"
                >
                  <div
                    style={{
                      width: `${totalPositives}%`,
                      backgroundColor: "teal",
                      opacity: 0.8,
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                      }}
                      className="my-2 text-white opacity-100"
                    >
                      <Image
                        height={16}
                        width={24}
                        src="/thumbs-up.svg"
                        alt="thumbs up"
                      />
                      {totalPositives}%
                    </div>
                  </div>
                  <div
                    style={{
                      width: `${totalNegatives}%`,
                      backgroundColor: "#F9AE2C",
                      opacity: 0.8,
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        right: 0,
                      }}
                      className="my-2 text-white opacity-100"
                    >
                      {totalNegatives}%
                      <Image
                        height={16}
                        width={24}
                        src="/thumbs-down.svg"
                        alt="thumbs down"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}

export default memo(withSize()(CelebritiesComponent));
