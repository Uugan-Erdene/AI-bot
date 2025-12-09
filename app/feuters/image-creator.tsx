"use client";

import { useState } from "react";
import { Refresh } from "../icons/refresh";
import { Star } from "../icons/star";
import { Button } from "@/components/ui/button";
import { NoteBook } from "../icons/notebook";

export const ImageCreator = () => {
  const [prompt, setPrompt] = useState(""); // зөв нэртэй state
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setPrompt("");
    setImageUrl(null);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return; // зөв state ашиглаж байна
    setLoading(true);
    setImageUrl(null);

    try {
      const response = await fetch("/api/imageCreator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }), // зөв key
      });
      const data = await response.json();

      if (data.error) {
        console.error(data.error);
      } else if (data.image) {
        setImageUrl(data.image);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-2 flex gap-3 items-center">
          <Star />
          Food image creator
        </h2>
        <button
          onClick={handleRefresh}
          className={`flex justify-center items-center w-12 h-10 rounded-lg border cursor-pointer ${
            imageUrl ? "bg-black" : "bg-white"
          }`}
        >
          <Refresh color={imageUrl ? "white" : "black"} />
        </button>
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        Describe the food, and AI will detect the ingredients.
      </p>

      <div className="flex items-center flex-col gap-2 justify-end mb-10">
        <input
          value={prompt} // state-ийг холбоно
          onChange={(e) => setPrompt(e.target.value)} // state шинэчилнэ
          className="w-145 h-31 border border-[gray] rounded-lg pl-3 pb-22"
          placeholder="hoolnii tailbar"
          onKeyPress={(e) => e.key === "Enter" && handleGenerate()}
        />
        <Button
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          className="px-6 h-10 rounded-lg bg-[gray]/90 hover:bg-gray-700 cursor-pointer ml-117"
        >
          {loading ? "loading..." : "Generate"}
        </Button>
      </div>

      <h3 className="text-lg font-medium flex items-center gap-3 mb-1">
        <NoteBook />
        Result
      </h3>

      {imageUrl && (
        <div>
          <img
            src={imageUrl}
            alt="Generated"
            className="w-90 h-90 rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};
