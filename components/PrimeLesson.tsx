import React from 'react';
import { AppStage } from '../types';

interface PrimeLessonProps {
  setStage: (stage: AppStage) => void;
}

const NumberBlock: React.FC<{ num: number; isPrime: boolean }> = ({ num, isPrime }) => (
  <div className={`
    w-16 h-16 m-2 flex items-center justify-center rounded-2xl text-2xl font-bold shadow-lg transform hover:scale-110 transition-all cursor-pointer
    ${isPrime ? 'bg-gradient-to-br from-pink-400 to-rose-500 text-white' : 'bg-white text-slate-700 border-2 border-slate-200'}
  `}>
    {num}
  </div>
);

const PrimeLesson: React.FC<PrimeLessonProps> = ({ setStage }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 max-w-4xl mx-auto w-full">
      <h2 className="text-4xl font-bold text-slate-800 mb-8 text-center">
        什么是<span className="text-rose-500">质数</span>？
      </h2>

      <div className="bg-white p-8 rounded-3xl shadow-xl w-full mb-8">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          <div className="flex-1 text-center">
             <div className="text-6xl mb-4">🧱</div>
             <h3 className="text-2xl font-bold text-rose-500 mb-2">质数 (Prime)</h3>
             <p className="text-slate-600">就像最基础的乐高积木。</p>
             <p className="text-slate-600">只能被 1 和它自己整除。</p>
             <div className="flex flex-wrap justify-center mt-4">
                {[2, 3, 5, 7, 11].map(n => <NumberBlock key={n} num={n} isPrime={true} />)}
             </div>
          </div>

          <div className="hidden md:block w-px h-64 bg-slate-200"></div>

          <div className="flex-1 text-center">
             <div className="text-6xl mb-4">🏠</div>
             <h3 className="text-2xl font-bold text-blue-500 mb-2">合数 (Composite)</h3>
             <p className="text-slate-600">由质数积木搭建而成的房子。</p>
             <p className="text-slate-600">可以拆分成更小的数字。</p>
             <div className="flex flex-wrap justify-center mt-4">
                {[4, 6, 8, 9, 10].map(n => <NumberBlock key={n} num={n} isPrime={false} />)}
             </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-100 p-6 rounded-2xl w-full mb-8 border-l-8 border-blue-500">
        <h4 className="text-xl font-bold text-blue-800 mb-2">💡 为什么这很重要？</h4>
        <p className="text-blue-700">
          在计算机世界（比如C++编程）里，我们用质数来制造<b>"锁"</b>。
          把两个质数乘在一起很简单，但是把它们拆开却很难！
          让我们玩个游戏来体验一下吧！
        </p>
      </div>

      <button
        onClick={() => setStage(AppStage.GAME)}
        className="px-10 py-4 bg-indigo-600 text-white text-2xl font-bold rounded-full shadow-lg hover:bg-indigo-700 transition-all hover:shadow-2xl active:scale-95 flex items-center gap-2"
      >
        🎮 开始游戏
      </button>
    </div>
  );
};

export default PrimeLesson;