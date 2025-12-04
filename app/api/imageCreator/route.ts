import { InferenceClient } from "@huggingface/inference";
import { NextRequest, NextResponse } from "next/server";
const HF_TOKEN = process.env.NEXT_PUBLIC_HF_TOKEN || process.env.HF_TOKEN;
const photo = new InferenceClient(HF_TOKEN || "");

export const POST = async (request: NextRequest) => {
  try {
    const req = await request.json();
    const { prompt } = req;
    console.log(req);
    if (!prompt) {
      return NextResponse.json(
        { error: "no prompt provided" },
        { status: 401 }
      );
    }
    const image = await photo.textToImage({
      provider: "nscale",
      model: "stabilityai/stable-diffusion-xl-base-1.0",
      inputs: prompt,
      parameters: { num_inference_steps: 5 },
    });
    const blob = image as unknown as Blob;
    const arrayBuffer = await blob.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const dataUrl = `data:image/png;base64,${base64}`;
    return NextResponse.json({ image: dataUrl });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error" },
      { status: 500 }
    );
  }
};
