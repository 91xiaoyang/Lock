import React, { useState, useEffect } from 'react';
import CryptoGame from './components/CryptoGame';
import { getCodeSnippetExplanation } from './services/geminiService';
import { ShieldCheck, KeyRound } from 'lucide-react';

const App: React.FC = () => {
  const [codeSnippet, setCodeSnippet] = useState<string>('');
  const [showCode, setShowCode] = useState<boolean>(false);

  useEffect(() => {
    // Pre-fetch a C++ explanation for the "Teacher's Corner"
    getCodeSnippetExplanation().then(setCodeSnippet);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-x-hidden font-fredoka">
      {/* Decorative Blobs */}
      <div className="blob bg-purple-300 w-96 h-96 rounded-full top-0 left-0 -translate-x-1/2 -translate-y-1/2 fixed"></div>
      <div className="blob bg-indigo-300 w-80 h-80 rounded-full bottom-0 right-0 translate-x-1/3 translate-y-1/3 fixed"></div>

      <main className="relative z-10 container mx-auto px-4 py-8 max-w-5xl">
        
        {/* Simplified Header & Intro Section */}
        <div className="text-center mb-8 animate-fade-in-down">
          <div className="inline-flex items-center justify-center p-4 bg-white rounded-full shadow-lg mb-6">
            <ShieldCheck size={48} className="text-indigo-600 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight">
              密码实验室
            </h1>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/50 max-w-4xl mx-auto text-left md:text-center">
            <h2 className="text-2xl font-bold text-indigo-700 mb-4 flex items-center justify-center gap-2">
              <KeyRound className="text-rose-500"/> 密码公式：N = P × Q
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed">
              在这个实验室里，我们把<b>密码 (N)</b> 藏起来，
              但我们会把一把<b>公钥 (P)</b> 给你。
              你的任务是猜出密码 N！
            </p>
            <div className="mt-4 p-4 bg-indigo-50 rounded-xl text-indigo-900 text-sm md:text-base font-medium">
                <p>🔓 <b>如果是合数（比如 72）：</b> 公钥 P 可能很大（比如 12），你只需要猜 12 的倍数，很容易就猜中了！</p>
                <p className="mt-2">🛡️ <b>如果是质数（比如 17）：</b> 公钥 P 只能是 1，你得从 1 猜到 100，累死人了！</p>
            </div>
          </div>
        </div>

        {/* The Game Section */}
        <div className="mb-20">
           <CryptoGame />
        </div>

      </main>

      {/* C++ Teacher's Corner (Sticky) */}
      <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${showCode ? 'w-80 md:w-96' : 'w-auto'}`}>
          {showCode && (
              <div className="bg-gray-900 text-gray-200 p-4 rounded-t-2xl shadow-2xl border border-gray-700 mb-2">
                  <div className="flex justify-between items-center mb-2 border-b border-gray-700 pb-2">
                      <span className="text-xs font-mono text-green-400">Main.cpp</span>
                      <span className="text-xs text-gray-500">老师的笔记</span>
                  </div>
                  <div className="text-xs font-mono whitespace-pre-wrap max-h-60 overflow-y-auto">
                      {codeSnippet || "// 正在连接实验室电脑..."}
                  </div>
              </div>
          )}
          <button 
            onClick={() => setShowCode(!showCode)}
            className="float-right bg-slate-800 text-white p-3 rounded-full shadow-lg hover:bg-slate-700 hover:scale-110 transition-all flex items-center gap-2"
            title="查看C++代码"
          >
            <span className="text-xl">💻</span> 
            {showCode ? '收起笔记' : 'C++ 老师的秘密笔记'}
          </button>
      </div>
    </div>
  );
};

export default App;