"use client";

import { useState, useRef } from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { diagnoseDesign, Diagnosis } from "./doctorEngine";

export function DesignDoctorDashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (selectedFile: File) => {
    if (!selectedFile.type.startsWith("image/")) return;
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setDiagnosis(null);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const runDiagnosis = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    try {
      const result = await diagnoseDesign(file);
      setDiagnosis(result);
    } catch (e) {
      console.error(e);
      alert("Failed to analyze design. Please try another image.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  const getSeverityIcon = (severity: string) => {
    if (severity === "critical") return "🔴";
    if (severity === "high") return "🟠";
    if (severity === "medium") return "🟡";
    return "🔵";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] w-full max-w-4xl mx-auto space-y-12">

      {/* Header & Upload Phase */}
      <div className="text-center w-full">
        <h2 className="text-3xl font-display font-bold text-white mb-2">Design Doctor</h2>
        <p className="text-zinc-400 mb-8">Upload your design and find out what needs fixing.</p>

        {!diagnosis && (
          <div className="max-w-2xl mx-auto">
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              className={cn(
                "relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 text-center transition-colors",
                isDragging
                  ? "border-red-500 bg-red-500/10"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/5",
                previewUrl ? "border-solid border-white/10 p-4" : ""
              )}
            >
              {previewUrl ? (
                <div className="w-full flex flex-col items-center">
                  <div className="relative w-full max-w-sm h-64 mb-6 rounded-lg overflow-hidden border border-white/10 bg-black/40">
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                    <button
                      onClick={(e) => { e.stopPropagation(); setPreviewUrl(null); setFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                      className="absolute top-2 right-2 rounded-md bg-black/60 p-1.5 text-white hover:bg-black/80"
                    >
                      <Icon name="close" className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={runDiagnosis}
                    disabled={isAnalyzing}
                    className="flex items-center gap-2 rounded-xl bg-red-600 px-8 py-3.5 font-bold text-white shadow-lg shadow-red-500/20 transition-all hover:bg-red-500 disabled:opacity-50"
                  >
                    {isAnalyzing ? (
                      <><Icon name="refresh" className="h-5 w-5 animate-spin" /> Analyzing...</>
                    ) : (
                      <><Icon name="inspect" className="h-5 w-5" /> Diagnose Design</>
                    )}
                  </button>
                </div>
              ) : (
                <div className="py-12 cursor-pointer w-full" onClick={() => fileInputRef.current?.click()}>
                  <Icon name="image" className="mx-auto mb-4 h-12 w-12 text-zinc-500" />
                  <p className="mb-2 text-lg font-medium text-white">Upload / Drag & Drop Design</p>
                  <p className="text-sm text-zinc-400">Supports PNG, JPG, WEBP</p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/webp"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
            </div>
          </div>
        )}
      </div>

      {/* Results Phase */}
      {diagnosis && (
        <div className="w-full space-y-12 pb-12 anim-rise-in">

          <div className="flex flex-col md:flex-row items-start gap-8">
            {previewUrl && (
              <div className="w-full md:w-1/3 shrink-0 rounded-xl overflow-hidden border border-white/10 bg-black/40">
                <img src={previewUrl} alt="Design" className="w-full h-auto object-cover" />
              </div>
            )}

            <div className="flex-1 space-y-6 w-full">
              {/* Health Score */}
              <div className="flex items-center gap-6 pb-6 border-b border-white/10">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-1">Design Health</h3>
                  <div className="flex items-baseline gap-2">
                    <span className={cn("text-5xl font-display font-bold", getHealthColor(diagnosis.healthScore))}>
                      {diagnosis.healthScore}
                    </span>
                    <span className="text-xl text-zinc-500 font-medium">/ 100</span>
                  </div>
                </div>
                <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                  <span className={cn("font-semibold text-lg", getHealthColor(diagnosis.healthScore))}>
                    {diagnosis.healthLabel}
                  </span>
                </div>
              </div>

              {/* Main Diagnosis */}
              <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-red-400 mb-4">Main Diagnosis</h3>
                <h4 className="text-2xl font-bold text-white mb-3">{diagnosis.mainDiagnosis.title}</h4>
                <p className="text-zinc-300 leading-relaxed mb-6">&quot;{diagnosis.mainDiagnosis.explanation}&quot;</p>

                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-1">Why this matters</span>
                    <p className="text-sm text-zinc-400">{diagnosis.mainDiagnosis.why}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-1">Recommended treatment</span>
                    <p className="text-sm text-white font-medium">{diagnosis.mainDiagnosis.fix}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Treatment Plan */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Treatment Plan</h3>
              <div className="space-y-3">
                {diagnosis.treatmentPlan.map(plan => (
                  <div key={plan.id} className="bg-white/[0.02] border border-white/5 rounded-xl p-4 flex gap-4">
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-bold text-zinc-500">0{plan.priority}</span>
                      <div className="w-px h-full bg-white/10 my-1"></div>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">{plan.label}</span>
                      <h4 className="text-base font-bold text-white mt-1 mb-1">{plan.title}</h4>
                      <p className="text-sm text-zinc-400">{plan.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Problems & What's Working */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Problems Found</h3>
                <div className="space-y-4">
                  {diagnosis.problems.map(prob => (
                    <div key={prob.id} className="group">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm">{getSeverityIcon(prob.severity)}</span>
                        <h4 className="text-sm font-bold text-white">{prob.title}</h4>
                      </div>
                      <div className="pl-6 space-y-2">
                        <p className="text-sm text-zinc-400">{prob.why}</p>
                        <p className="text-xs font-medium text-zinc-300"><span className="text-zinc-500">Fix:</span> {prob.fix}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">What&apos;s Working</h3>
                <ul className="space-y-2">
                  {diagnosis.workingWell.map((good, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-zinc-300">
                      <Icon name="check" className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Category Scores */}
          <div className="space-y-4 pt-6 border-t border-white/10">
            <h3 className="text-lg font-bold text-white">Category Analysis</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {Object.entries(diagnosis.scores).map(([cat, score]) => (
                <div key={cat} className="bg-white/[0.02] border border-white/5 rounded-xl p-4 text-center">
                  <span className="block text-xs text-zinc-500 uppercase tracking-wider mb-2">{cat}</span>
                  <span className={cn("text-2xl font-bold font-display", getHealthColor(score))}>{score}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-8 flex justify-center">
             <button
                onClick={() => { setDiagnosis(null); setPreviewUrl(null); setFile(null); }}
                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
              >
                <Icon name="refresh" className="h-4 w-4" /> Start New Diagnosis
              </button>
          </div>

        </div>
      )}
    </div>
  );
}
