import { useState } from "react";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function ChatBotPage() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async (question: string) => {
    setMessages((prev) => [...prev, { sender: "user", text: question }]);
    setLoading(true);
    setInput("");

    try {
      const response = await client.responses.create({
        model: "gpt-4o-mini",   // ✅ Browser-safe model
        input: question,
      });

      const aiText =
        response.output_text ||
        "Sorry, I couldn't understand. Try again!";

      setMessages((prev) => [...prev, { sender: "ai", text: aiText }]);
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "❌ Failed to connect to AI. (Browser-safe fix needed)" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 pt-20 px-4">
      <h1 className="text-center text-3xl font-bold text-teal-300 mb-6">
        EduMantra AI Tutor
      </h1>

      <div className="max-w-3xl mx-auto bg-slate-800/50 p-6 rounded-xl shadow-lg h-[60vh] overflow-y-auto">
        {messages.map((m, i) => (
          <div key={i} className={`mb-4 ${m.sender === "user" ? "text-right" : "text-left"}`}>
            <span
              className={`inline-block px-4 py-2 rounded-xl ${
                m.sender === "user" ? "bg-teal-400 text-black" : "bg-slate-700 text-white"
              }`}
            >
              {m.text}
            </span>
          </div>
        ))}

        {loading && <p className="text-sm text-teal-300 animate-pulse">AI is typing…</p>}
      </div>

      <div className="max-w-3xl mx-auto mt-4 flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything…"
          className="flex-1 bg-slate-800 border border-slate-600 px-4 py-2 rounded-lg"
          onKeyDown={(e) => e.key === "Enter" && input.trim() && askAI(input)}
        />
        <button
          onClick={() => askAI(input)}
          className="px-6 py-2 bg-teal-400 text-black rounded-lg font-semibold"
        >
          Send
        </button>
      </div>
    </div>
  );
}
