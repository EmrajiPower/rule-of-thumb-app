import { memo, useEffect, useCallback } from "react";
import { withSize } from "react-sizeme";
import {
  HANDLE_STORE_CELEBRITIES,
  HANDLE_STORE_VOTES,
  HANDLE_UPDATE_CELEBRITIES,
} from "./reducers/types";

import celebrityData from "../assets/data.json";

import Image from "next/image";

import { handleTimePeriod } from "./Utils";
import { useAppContext } from "./provider";

function CelebritiesComponent({ size }) {
  const { state, dispatch } = useAppContext();

  let celebritiesStorage = JSON.parse(localStorage.getItem("celebrities"));

  //Función que despacha al Hook useReducer las celebridades
  const handleGetCelebrities = useCallback(async () => {
    if (celebritiesStorage && Object.values(celebritiesStorage).length) {
      //Se guarda en el estado global la lista de celebridades almacenadas en API LocalStorage
      await dispatch({
        type: HANDLE_STORE_CELEBRITIES,
        payload: celebritiesStorage,
      });
    } else {
      //Se guarda en el estado global la lista de celebridades de data.json
      await dispatch({
        type: HANDLE_STORE_CELEBRITIES,
        payload: celebrityData.data.map((d) => {
          return {
            ...d,
            alreadyVote: false,
            votingState: "waiting",
            voteType: null,
          };
        }),
      });
    }
  }, []);

  //Montando el componente, guardando en contexto de la aplicación a las celebridades
  useEffect(() => {
    handleGetCelebrities();
  }, []);

  //Se actualiza ele estado global del componente cada vez que ve el usuario realiza un voto
  useEffect(() => {
    if (state?.voting.length) {
      handleUpdateCelebrities();
      localStorage.setItem("celebrities", JSON.stringify(state.voting));
    }
  }, [state.voting]);

  //Función que despacha el Hook useReducer cuando se actualizan los votos
  const handleUpdateCelebrities = useCallback(async () => {
    await dispatch({
      type: HANDLE_UPDATE_CELEBRITIES,
    });
  }, []);

  //Función de utilidad para retornar con jsx el botón "Vote Now"/"Vote Again"
  const handleVoteAction = (alreadyVote, votingState, voteType, name) => {
    switch (alreadyVote) {
      case true:
        return (
          <button
            aria-label="voting"
            className="bg-gray-700 px-1 opacity-80 h-9 focus:outline-white"
            onClick={() => {
              dispatch({
                type: HANDLE_STORE_VOTES,
                payload: {
                  name,
                  votingState: "waiting",
                  voteType: null,
                  positive: 0,
                  negative: 0,
                  alreadyVote: false,
                },
              });
            }}
          >
            Vote Again
          </button>
        );
      case false:
        return (
          <button
            aria-label="voting"
            disabled={votingState !== "pending"}
            className={`px-1 opacity-80 focus:outline-white ${
              votingState !== "pending" ? "bg-gray-300" : "bg-gray-700"
            }`}
            onClick={() => {
              if (votingState === "pending") {
                if (voteType === "increase") {
                  dispatch({
                    type: HANDLE_STORE_VOTES,
                    payload: {
                      name,
                      votingState: "waiting",
                      voteType: null,
                      positive: 1,
                      negative: 0,
                      alreadyVote: true,
                    },
                  });
                } else {
                  dispatch({
                    type: HANDLE_STORE_VOTES,
                    payload: {
                      name,
                      votingState: "waiting",
                      voteType: null,
                      negative: 1,
                      positive: 0,
                      alreadyVote: true,
                    },
                  });
                }
              }
            }}
          >
            Vote Now
          </button>
        );
      default:
        break;
    }
  };

  //Función de utilidad para mostrar la fecha de la encuesta/Eyebrow de votacón
  const handlePollDateQuote = (alreadyVote, lastUpdated, category) => {
    if (alreadyVote === false) {
      return (
        <label className="text-right my-2 mx-0">
          {handleTimePeriod(lastUpdated)}
          {""} month ago in {category}
        </label>
      );
    } else {
      return (
        <label className="text-right my-2 mx-0">Thanks for your vote!</label>
      );
    }
  };

  //Leyendo el ancho de la pantalla para ajustar (alto x ancho) de las celebridades
  let propsSize = size.width;
  let handleImgSizes = propsSize >= 768 ? 320 : 200;
  let handleBtnHeight = propsSize >= 768 ? 16 : 12;
  let handleBtnWidth = propsSize >= 768 ? 24 : 20;

  //👉 My code goes here 👉
  return (
    <div className="flex flex-row flex-wrap">
      {state.celebrities.map(
        (
          {
            name,
            picture,
            description,
            lastUpdated,
            category,
            votes,
            alreadyVote,
            votingState,
            voteType,
          },
          index
        ) => {
          //Mostrar un poco de la descripción
          let handleLookDescription = description.match(/.{1,48}/g)[0] + "...";

          //La suma de los votos por persona
          let totalVotes = votes.positive + votes.negative;

          //La cantidad de votos "+" y "-" por persona en %
          let totalPositives = ((100 * votes.positive) / totalVotes).toFixed(1);
          let totalNegatives = ((100 * votes.negative) / totalVotes).toFixed(1);

          //
          return (
            <div key={index} className="relative text-center flex my-3 mx-auto">
              <Image
                width={handleImgSizes}
                height={handleImgSizes}
                src={`/${picture}`}
              />
              <div className="flex justify-center flex-col transform -translate-y-2/4 -translate-x-2/4 absolute top-2/4 left-2/4 w-64 text-white">
                <h3 className="text-left font-semibold">{name}</h3>
                <label className="text-center my-2 mx-auto">
                  {handleLookDescription}
                </label>
                {handlePollDateQuote(alreadyVote, lastUpdated, category)}
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      dispatch({
                        type: HANDLE_STORE_VOTES,
                        payload: {
                          name,
                          votingState: "pending",
                          voteType: "increase",
                          positive: 0,
                          negative: 0,
                          alreadyVote: false,
                        },
                      });
                    }}
                    className={`icon-button border-2 focus:ring focus:outline-white ${
                      alreadyVote === true && "hidden"
                    }`}
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
                    className={`icon-button border-2 focus:ring focus:outline-white ${
                      alreadyVote === true && "hidden"
                    }`}
                    onClick={() => {
                      dispatch({
                        type: HANDLE_STORE_VOTES,
                        payload: {
                          name,
                          votingState: "pending",
                          voteType: "decrease",
                          positive: 0,
                          negative: 0,
                          alreadyVote: false,
                        },
                      });
                    }}
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
                  {handleVoteAction(alreadyVote, votingState, voteType, name)}
                </div>
              </div>
              <div className="flex flex-row justify-center">
                <div className="h-10 absolute left-0 bottom-0 w-full flex flex-row">
                  <div
                    style={{
                      width: `${totalPositives}%`,
                    }}
                    className="bg-teal opacity-80 flex justify-start"
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
                    }}
                    className="bg-yellowThumb opacity-80 flex justify-start"
                  >
                    <div className="my-2 text-white opacity-100 absolute right-0">
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
