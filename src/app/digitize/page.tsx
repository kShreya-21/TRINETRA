"use client";

import { useState } from "react";
import { UploadPanel } from "@/components/digitize/upload-panel";
import { OcrProgress } from "@/components/digitize/ocr-progress";
import { ReviewForm } from "@/components/digitize/review-form";
import { extractFields, EMPTY_FIELDS, type ExtractedFields } from "@/lib/ner";

type Stage = "idle" | "recognizing" | "done";

/** Rasterizes the sample SVG onto a canvas and returns a PNG data URL —
 * guarantees Tesseract receives a proper raster image regardless of its
 * SVG support. */
async function rasterizeSvg(url: string): Promise<string> {
  const img = new Image();
  img.src = url;
  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
  });
  const scale = 1.5;
  const canvas = document.createElement("canvas");
  canvas.width = img.width * scale;
  canvas.height = img.height * scale;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/png");
}

export default function DigitizePage() {
  const [stage, setStage] = useState<Stage>("idle");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [ocrStatus, setOcrStatus] = useState("");
  const [rawText, setRawText] = useState("");
  const [fields, setFields] = useState<ExtractedFields>(EMPTY_FIELDS);
  const [error, setError] = useState<string | null>(null);

  async function runOcr(imageSource: string | File) {
    setError(null);
    setStage("recognizing");
    setProgress(0);
    setOcrStatus("initializing");

    try {
      const { createWorker } = await import("tesseract.js");
      const worker = await createWorker("eng", 1, {
        logger: (m) => {
          if (m.status) setOcrStatus(m.status);
          if (typeof m.progress === "number") setProgress(m.progress);
        },
      });
      const { data } = await worker.recognize(imageSource);
      await worker.terminate();

      setRawText(data.text);
      setFields(extractFields(data.text));
      setStage("done");
    } catch (err) {
      console.error(err);
      setError(
        "OCR failed to run. This can happen on a slow connection the first time (it downloads a language model) — try again in a moment."
      );
      setStage("idle");
    }
  }

  async function handleFileSelected(file: File) {
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    await runOcr(file);
  }

  async function handleUseSample() {
    try {
      const dataUrl = await rasterizeSvg("/sample-claim-form.svg");
      setPreviewUrl(dataUrl);
      await runOcr(dataUrl);
    } catch (err) {
      console.error(err);
      setError("Couldn't load the sample form.");
    }
  }

  function reset() {
    setStage("idle");
    setPreviewUrl(null);
    setProgress(0);
    setRawText("");
    setFields(EMPTY_FIELDS);
    setError(null);
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-wider text-clay">
        Digitization
      </p>
      <h1 className="mt-3 font-display text-4xl text-ink md:text-5xl">
        From scanned form to structured record
      </h1>
      <p className="mt-4 max-w-2xl text-ink-soft">
        OCR reads the document, rule-based extraction pulls out the fields
        that matter, and a human confirms every value before it counts as
        digitized — this is the pipeline behind the digitization numbers on
        the Dashboard.
      </p>

      {error && (
        <div className="mt-6 rounded-lg border border-rejected/30 bg-rejected/5 p-4 text-sm text-rejected">
          {error}
        </div>
      )}

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <UploadPanel
          onFileSelected={handleFileSelected}
          onUseSample={handleUseSample}
          previewUrl={previewUrl}
          disabled={stage === "recognizing"}
        />

        {stage === "recognizing" && (
          <OcrProgress status={ocrStatus} progress={progress} />
        )}

        {stage === "done" && (
          <ReviewForm initialFields={fields} rawText={rawText} />
        )}

        {stage === "idle" && !previewUrl && (
          <div className="flex items-center justify-center rounded-xl border border-dashed border-line p-10 text-center">
            <p className="text-sm text-ink-soft">
              Upload a form or try the sample to see extraction happen live.
            </p>
          </div>
        )}
      </div>

      {stage === "done" && (
        <button
          onClick={reset}
          className="mt-8 rounded-full border border-line px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-ink transition-colors hover:border-forest hover:text-forest"
        >
          Try another document
        </button>
      )}
    </div>
  );
}
