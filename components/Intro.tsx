import React from 'react';
import { AppStage } from '../types';
import { ShieldCheck } from 'lucide-react';

interface IntroProps {
  setStage: (stage: AppStage) => void;
}

const Intro: React.FC<IntroProps> = ({ setStage }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
      <div className="bg-white p-6 rounded-full shadow-2xl mb-8 animate-[bounce_3s_infinite]">
        <ShieldCheck size={80} className="text-indigo-600" />
      </div>
      
      <h1 className="text-5xl md:text-7xl font-bold text-slate-800 mb-6 tracking-tight">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">PrimeLock</span>
      </h1>
      
      <p className="text-2xl text-slate-600 mb-2 font-medium">
        小小密码学家训练营
      </p>
      
      <p className="text-lg text-slate-500 max-w-xl mb-10 leading-relaxed">
        欢迎来到 C++ 编程魔法课！今天我们要揭开数字世界的秘密：
        为什么简单的<b>"质数"</b>能保护我们所有的秘密？
      </p>

      <button
        onClick={() => setStage(AppStage.LESSON)}
        className="group relative inline-flex items-center justify-center px-10 py-5 text-2xl font-bold text-white transition-all duration-200 bg-indigo-600 rounded-full focus:outline-none focus:ring-4 focus:ring-indigo-300 hover:bg-indigo-700 hover:scale-105 shadow-xl"
      >
        🚀 开始探索
        <div className="absolute -inset-3 rounded-full bg-indigo-400 opacity-20 group-hover:opacity-40 blur-lg transition-opacity duration-200" />
      </button>
    </div>
  );
};

export default Intro;