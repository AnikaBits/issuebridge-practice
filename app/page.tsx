"use client";

import { useState } from "react";

export default function Home() {
  const [issueText, setIssueText] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

 const handleAnalyze = async () => {
  if (!issueText) return;
  setLoading(true);
  setResult(null);

  try {
    // আমাদের তৈরি করা ব্যাকএন্ড API-তে কল করছি
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: issueText }),
    });

    const data = await response.json();
    
    if (data.result) {
      setResult(data.result);
    } else {
      setResult("Error: " + (data.error || "Something went wrong"));
    }
  } catch (error) {
    console.error(error);
    setResult("Network error! Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* হেডার */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-400">IssueBridge</h1>
          <p className="text-gray-400 mt-2">Understand GitHub issues instantly with AI</p>
        </div>

        {/* ইনপুট এরিয়া */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Paste GitHub Issue Description
          </label>
          <textarea
            className="w-full h-40 p-4 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white resize-none"
            placeholder="Paste the issue title and description here..."
            value={issueText}
            onChange={(e) => setIssueText(e.target.value)}
          />
          <button
            onClick={handleAnalyze}
            disabled={loading || !issueText}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-all"
          >
            {loading ? "Analyzing with AI..." : "Analyze Issue"}
          </button>
        </div>

        {/* রেজাল্ট এরিয়া */}
        {result && (
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <h2 className="text-xl font-bold text-green-400 mb-4">AI Analysis</h2>
            <div className="p-4 bg-gray-900 rounded-lg text-gray-300">
              {result}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}