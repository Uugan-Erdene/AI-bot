"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Refresh } from "../icons/refresh";
import { Star } from "../icons/star";
import { Button } from "@/components/ui/button";
import { NoteBook } from "../icons/notebook";
// import { DeleteTrash } from "../icons/deletetrash";

export const ImageAnalysis = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState("");
  const [preview, setPreview] = useState("");
  const handleRefresh = () => {
    setResult("");
    setPreview("");
  };

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreview(imageUrl);
  };
  const handleGenerate = async () => {
    if (!selectedFile) return;
    setIsGenerating(true);
    const from = new FormData();
    from.append("image", selectedFile);

    const result = await fetch(`/api/generate`, {
      method: "POST",
      body: from,
    });
    const data = await result.json();
    setResult(
      `${data?.objects?.map((cur: { label: string }) => cur.label).join(",")}`
    );
    setIsGenerating(false);
  };
  return (
    <div className="w-full max-w-3xl mx-auto mt-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-2 flex gap-3 items-center ">
          <span>
            <Star />
          </span>
          Image analysis
        </h2>
        <button
          onClick={handleRefresh}
          className="flex justify-center items-center w-12 h-10 rounded-lg border cursor-pointer "
        >
          <Refresh />
        </button>
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        Upload a food photo, and AI will detect the ingredients.
      </p>

      <div className="flex items-center  gap-3 mb-10">
        <Input
          type="file"
          name="image"
          accept="image/*"
          className="w-50 h-10 rounded-lg"
          onChange={handleImageChange}
        />

        <Button
          className="px-6 h-10 rounded-lg bg-gray-600 hover:bg-gray-700 cursor-pointer"
          onClick={handleGenerate}
        >
          Generate
        </Button>
        {preview.length !== 0 && (
          <img
            src={preview}
            alt="preview"
            className="w-50 h-34 object-cover rounded-lg border relative"
          />
        )}
        {/* <button className="absolute">
          <DeleteTrash />
        </button> */}
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
        onChange={handleImageChange}
        value={result}
      />
    </div>
  );
};
