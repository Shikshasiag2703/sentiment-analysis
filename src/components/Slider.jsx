"use client";
import React, { useState } from "react";

const RotationBasedOnSentiment = {
  NEUTRAL: "rotate-180",
  NEGATIVE: "rotate-90",
  POSITIVE: "rotate-[270deg]",
  WEAK_POSITIVE: "rotate-[270deg]",
};

const MoodBasedOnSentiment = {
  NEUTRAL: "Meh, life's okay.",
  NEGATIVE: "Stormy skies ahead... 🌩️",
  POSITIVE: "Over the moon! 🌕✨",
  WEAK_POSITIVE: "A gentle breeze of joy. 🍃",
};

const BackgroundBasedOnSentiment = {
  NEUTRAL: "neutral",
  NEGATIVE: "negative",
  POSITIVE: "positive",
  WEAK_POSITIVE: "positive",
};

const Slider = () => {
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [sentiment, setSentiment] = useState("NEUTRAL");

  const onSubmit = (e) => {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget));
    const text = values.text;
    if (!text) return;
    const apiUrl = `https://api.api-ninjas.com/v1/sentiment?text=${encodeURIComponent(
      text
    )}`;
    setLoading(true);
    fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-Api-Key": "UMt73wRLqlyUZMTyNQMvyg==tDOTn7PsymMtxJ3e",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
      })
      .then((data) => {
        setScore(data.score);
        setSentiment(data.sentiment);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div
      className={`select-none restricted min-h-screen p-10 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <div
        className={`gradientLeft transition-transform duration-500 ease-in-out ${
          BackgroundBasedOnSentiment[sentiment] ||
          BackgroundBasedOnSentiment.NEUTRAL
        }`}
      ></div>
      <div
        className={`gradientRight transition-transform duration-500 ease-in-out ${
          BackgroundBasedOnSentiment[sentiment] ||
          BackgroundBasedOnSentiment.NEUTRAL
        }`}
      ></div>
      <div className="w-full max-w-[1100px] space-y-8 mx-auto">
        <h2 className="text-white font-extrabold text-5xl text-center">
          Sentiment Analysis
        </h2>
        <p className="text-white text-lg text-center">
          Provide us with any text, and our AI will analyze it to determine its
          sentiment. We'll give <br /> you a rating and let you know if it's
          positive, negative, or neutral!
        </p>
        <div className="w-full space-y-14 justify-center items-center flex flex-col">
          <form onSubmit={onSubmit} className="w-full">
            <div className="relative">
              <input
                disabled={loading}
                name="text"
                className="select-all bg-white h-12 px-2 py-1.5 w-full border border-gray-300 outline-none rounded-md"
                placeholder="Type a keyword, sentence or text to analyze..."
              />
              {loading ? (
                <div className="absolute top-1/2 -translate-y-1/2 right-2 loader" />
              ) : (
                <div className="absolute top-1/2 -translate-y-1/2 right-2">
                  <button
                    type="submit"
                    className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:opacity-70 focus-visible:outline-none focus-visible:outline-black disabled:text-[#f4f4f4] disabled:hover:opacity-100 dark:focus-visible:outline-white disabled:dark:bg-token-text-quaternary dark:disabled:text-token-main-surface-secondary bg-black text-white disabled:bg-[#D7D7D7]"
                  >
                    <img
                      width={32}
                      height={32}
                      src="/arrow-submit.svg"
                      alt="arrow-submit"
                    />
                  </button>
                </div>
              )}
            </div>
          </form>
          {/* Slider Start */}
          <div className="w-96 h-96 flex-col flex overflow-hidden rounded-full relative border-t border-t-[#06070a]">
            <div className="flex-1 flex bg-slate-600">
              <div className="bg-[#FF001D] flex-1 flex justify-center pt-8">
                <img
                  width={45}
                  height={45}
                  src="/sad-smile.svg"
                  alt="sad-smile"
                />
              </div>
              <div className="bg-[#F7C10B] flex-1 flex justify-center items-start pt-8">
                <img
                  width={45}
                  height={45}
                  src="/neutral-smile.svg"
                  alt="neutral-smile"
                />
              </div>
              <div className="bg-[#71D7A6] flex-1 flex justify-center pt-8">
                <img
                  width={45}
                  height={45}
                  src="/happy-smile.svg"
                  alt="happy-smile"
                />
              </div>
            </div>
            <div
              className={`absolute top-1/2 -translate-y-1/2 bg-[#06070a] w-40 h-48 rounded-t-full left-1/2 -translate-x-1/2`}
            >
              <div className="flex flex-col gap-10 items-center justify-center pt-4">
                <img
                  width={80}
                  height={80}
                  src="/pointer.svg"
                  className={`transition-transform duration-300 ease-in-out ${
                    RotationBasedOnSentiment[sentiment] ||
                    RotationBasedOnSentiment.NEUTRAL
                  }`}
                  alt="pointer"
                />
                <div className="flex flex-col justify-center items-center">
                  <p className="text-white text-xl">
                    <b>Score:</b> {(score * 100).toFixed(1)}%
                  </p>
                  <p className="text-white text-xl whitespace-nowrap">
                    <b>Mood:</b> {MoodBasedOnSentiment[sentiment]}
                  </p>
                  <p className="text-gray-100 text-lg whitespace-nowrap">
                    (Sentiment {sentiment})
                  </p>
                </div>
              </div>
            </div>
            <div
              className={`flex-1 ${
                BackgroundBasedOnSentiment[sentiment] ||
                BackgroundBasedOnSentiment.NEUTRAL
              }`}
            ></div>
          </div>
          {/* Slider END */}
        </div>
      </div>
    </div>
  );
};

export default Slider;
