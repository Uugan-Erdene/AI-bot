import { InferenceClient } from "@huggingface/inference";
import { NextRequest, NextResponse } from "next/server";
const HF_TOKEN = process.env.NEXT_PUBLIC_TOKEN || process.env.HF_TOKEN;
const inference = new InferenceClient(HF_TOKEN || "");
interface DetectionResult {
  label: string;
  score: number;
  box: { xmin: number; ymin: number; xmax: number; ymax: number };
}
export const POST = async (request: NextRequest) => {
  try {
  } catch (error) {
    console.log(error);
  }
};
