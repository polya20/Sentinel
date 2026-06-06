import React from "react";
import { QuestionDef } from "../types";
import { cn } from "../lib/utils";
import { AlertCircle, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";

interface QuestionCardProps {
  key?: string | number;
  question: QuestionDef;
  onClick: (q: string) => void;
}

export function QuestionCard({ question, onClick }: QuestionCardProps) {
  const statusColors = {
    green: "border-t-[#10B981]",
    yellow: "border-t-[#F59E0B]",
    red: "border-t-[#EF4444]",
  };

  const badges = {
    green: "bg-[#10B98122] text-[#10B981] border-[#10B98144] tracking-wider",
    yellow: "bg-[#F59E0B22] text-[#F59E0B] border-[#F59E0B44] tracking-wider",
    red: "bg-[#EF444422] text-[#EF4444] border-[#EF444444] tracking-wider",
  };

  const badgeLabels = {
    green: "HEALTHY",
    yellow: "MANAGEABLE",
    red: "URGENT",
  };

  return (
    <button
      onClick={() => onClick(question.text)}
      className={cn(
        "group flex flex-col items-start p-4 text-left transition-all duration-200 w-full h-full border-t-2 shadow-lg bg-[#161618] hover:bg-[#1A1A1C] cursor-pointer",
        statusColors[question.status]
      )}
    >
      <div className="flex justify-between items-start mb-4 w-full gap-2">
         <h3 className="text-[11px] font-bold text-white uppercase leading-tight line-clamp-2">{question.subCategory}</h3>
         <span className={cn("text-[9px] px-1.5 py-0.5 rounded border leading-none shrink-0", badges[question.status])}>
            {badgeLabels[question.status]}
         </span>
      </div>
      <p className="text-xs text-white mb-3 leading-relaxed flex-1">{question.text}</p>
      
      <div className="mt-auto pt-2 text-[10px] text-slate-400 uppercase font-bold tracking-wider group-hover:text-white transition-colors flex items-center gap-1">
         <span>Query KCC &rarr;</span>
      </div>
    </button>
  );
}
