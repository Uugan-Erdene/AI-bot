"use client";
import { useState } from "react";
import { Refresh } from "../icons/refresh";
import { Star } from "../icons/star";
import { Button } from "@/components/ui/button";
import { NoteBook } from "../icons/notebook";
export const IngredientRecognition = () => {
  const [foodName, setFoodName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [loading, setLoading] = useState(false);

  const handleIngredients = async () => {
    if (!foodName.trim()) return;
    setLoading(true);
    setIngredients("");
    try {
      const response = await fetch("/api/ingredient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ foodName }),
      });
      const data = await response.json();
      if (data.error) {
        console.error(data.error);
      } else if (data.string) {
        setIngredients(data.string);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-2 flex gap-3 items-center ">
          <span>
            <Star />
          </span>
          Ingredient recognition
        </h2>
        <button className="flex justify-center items-center w-12 h-10 rounded-lg border cursor-pointer ">
          <Refresh />
        </button>
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        Describe the food, and AI will detect the ingredients.
      </p>

      <div className="flex items-center flex-col gap-2 justify-end mb-10">
        <input
          className="w-145 h-31 border border-[gray] rounded-lg pl-3 pb-22"
          placeholder="Orts todorhoiloh"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleIngredients()}
        />
        <Button
          onClick={handleIngredients}
          disabled={loading || !foodName.trim()}
          className="px-6 h-10 rounded-lg bg-[gray]/90 hover:bg-gray-700 cursor-pointer ml-117"
        >
          {loading ? "Loading..." : "Generate"}
        </Button>
      </div>

      <h3 className="text-lg font-medium flex items-center gap-3 mb-1">
        <span>
          <NoteBook />
        </span>
        Here is the summary
      </h3>

      <input
        className="text-sm text-muted-foreground border w-145 min-h-10 rounded-lg flex items-center pl-3"
        placeholder="First, enter your image to recognize the ingredients."
        value={ingredients}
      />
    </div>
  );
};
