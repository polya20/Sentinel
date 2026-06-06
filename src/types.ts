export type StatusIndicatorStyle = "green" | "yellow" | "red";

export interface QuestionDef {
  id: string;
  text: string;
  status: StatusIndicatorStyle; // mock status
  category: string;
  subCategory: string;
}

export type TabCategory = "Pre-Incident" | "Active Incident" | "Post-Incident" | "Meta" | "Capabilities";

export interface ChatMessage {
  role: "user" | "model";
  parts: { text: string }[];
}
