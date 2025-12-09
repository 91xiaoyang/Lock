import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { explainConcept } from '../services/geminiService';
import { Lock, Unlock, Search, RefreshCcw, Shield, ShieldAlert, Key } from 'lucide-react';

type LockType = 'COMPOSITE' | 'PRIME';

const CryptoGame: React.FC = () => {
  const [lockType, setLockType] = useState<LockType>('COMPOSITE');
  const [n, setN] = useState<number>(0); // The Secret Password
  const [p, setP] = useState<number>(0); // The Public Key
  // q is implied as n/p
  
  const [options, setOptions] = useState<number[]>([]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('');
  const [isSolved, setIsSolved] = useState<boolean>(false);
  
  const [teacherTip, setTeacherTip] = useState<string>('');
  const [loadingTip, setLoadingTip] = useState<boolean>(false);

  const startGame = (type: LockType) => {
    setLockType(type);
    setIsSolved(false);
    setFeedback('');
    setTeacherTip('');
    setIsScanning(true);
    setOptions([]);

    // 1. Determine Secret N and Public Key P
    let secret = 0;
    let publicKey = 0;
    const maxVal = 100;

    if (type === 'COMPOSITE') {
        // Example: 72 (12 * 6), 60 (12 * 5), 48 (12 * 4)
        // We pick a "Public Key" P first, e.g., 12, 8, or 10
        const possiblePs = [8, 9, 10, 12, 15];
        publicKey = possiblePs[Math.floor(Math.random() * possiblePs.length)];
        
        // Pick a Q (2 to 9)
        const q = Math.floor(Math.random() * 8) + 2; 
        secret = publicKey * q;
    } else {
        // Prime Case
        const primes = [17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
        secret = primes[Math.floor(Math.random() * primes.length)];
        publicKey = 1; // Primes only have 1 as a generic factor
    }

    setN(secret);
    setP(publicKey);

    // 2. Generate Options Grid after a fake delay
    setTimeout(() => {
        const newOptions: number[] = [];
        // We generate multiples of P up to maxVal
        for (let i = publicKey; i <= maxVal; i += publicKey) {
            newOptions.push(i);
        }
        setOptions(newOptions);
        setIsScanning(false);
    }, 1000);
  };

  useEffect(() => {
    startGame('COMPOSITE');
  }, []);

  const handleGuess = async (guess: number) => {
    if (isSolved) return;

    if (guess === n) {
      setIsSolved(true);
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
      setFeedback('🎉 密码破解成功！');
      
      setLoadingTip(true);
      const tipContext = lockType === 'COMPOSITE' 
        ? `密码是合数 ${n}。因为我们知道公钥 P=${p}，所以只要试很少的几次（${options.length}次）就猜中了。合数不安全！`
        : `密码是质数 ${n}。公钥 P=1，我们不得不面对 ${options.length} 个选项盲猜。质数太安全了！`;
        
      const tip = await explainConcept(
        lockType === 'COMPOSITE' ? "为什么有公钥P很容易猜中N？" : "为什么公钥P=1时很难猜中N？", 
        tipContext
      );
      setTeacherTip(tip);
      setLoadingTip(false);
    } else {
      setFeedback('❌ 密码错误');
      // Shake effect or similar could go here
      setTimeout(() => setFeedback(''), 1000);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* 1. Mode Selection */}
      <div className="flex justify-center gap-6 mb-8">
        <button
          onClick={() => startGame('COMPOSITE')}
          className={`flex-1 max-w-xs flex flex-col items-center p-4 rounded-2xl border-4 transition-all ${
            lockType === 'COMPOSITE' 
              ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-xl scale-105' 
              : 'bg-white border-slate-200 text-slate-400 hover:border-blue-300'
          }`}
        >
          <ShieldAlert size={40} className="mb-2" />
          <div className="font-bold text-xl">脆弱的合数</div>
          <div className="text-sm opacity-75">容易被公钥 P 缩小范围</div>
        </button>

        <button
          onClick={() => startGame('PRIME')}
          className={`flex-1 max-w-xs flex flex-col items-center p-4 rounded-2xl border-4 transition-all ${
            lockType === 'PRIME' 
              ? 'bg-rose-50 border-rose-500 text-rose-700 shadow-xl scale-105' 
              : 'bg-white border-slate-200 text-slate-400 hover:border-rose-300'
          }`}
        >
          <Shield size={40} className="mb-2" />
          <div className="font-bold text-xl">坚固的质数</div>
          <div className="text-sm opacity-75">公钥 P 帮不上忙</div>
        </button>
      </div>

      {/* 2. Game Board */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200 flex flex-col md:flex-row min-h-[500px]">
         
         {/* Left: Info Panel */}
         <div className="md:w-1/3 bg-slate-50 p-8 border-r border-slate-100 flex flex-col items-center justify-center text-center z-10">
            <div className="mb-6">
                <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-white mb-4 shadow-lg ${isSolved ? 'bg-green-500' : 'bg-slate-800'}`}>
                    {isSolved ? <Unlock size={40}/> : <Lock size={40}/>}
                </div>
                <h3 className="text-3xl font-bold text-slate-800 mb-2">
                    {isSolved ? n : '???'}
                </h3>
                <p className="text-slate-500 font-bold uppercase tracking-wider text-sm">密码 N</p>
            </div>

            <div className="w-full bg-white p-4 rounded-xl border-2 border-dashed border-indigo-200 mb-6">
                <p className="text-sm text-slate-500 mb-1">黑客获取的公钥</p>
                <div className="flex items-center justify-center gap-2 text-2xl font-bold text-indigo-600">
                    <Key size={24} /> 
                    <span>P = {isScanning ? '...' : p}</span>
                </div>
            </div>

            <div className="text-left bg-yellow-50 p-4 rounded-xl border border-yellow-200 text-sm text-yellow-800">
                {isScanning ? (
                    <span className="flex items-center gap-2"><RefreshCcw className="animate-spin" size={16}/> 正在分析公钥...</span>
                ) : (
                    <>
                    <p className="mb-2 font-bold">🕵️ 黑客分析：</p>
                    <p>既然 N = P × Q</p>
                    <p>那么 N 肯定是 <span className="font-bold text-indigo-600">{p}</span> 的倍数！</p>
                    <p className="mt-2 border-t border-yellow-200 pt-2">
                        {lockType === 'COMPOSITE' 
                           ? `太棒了！P=${p} 很大，我们只需要检查右边的 ${options.length} 个数字。` 
                           : `糟糕！P=${p} 太小了，这意味着我们要检查所有的数字！`}
                    </p>
                    </>
                )}
            </div>
         </div>

         {/* Right: Guessing Grid */}
         <div className="md:w-2/3 p-6 bg-slate-100 relative overflow-y-auto max-h-[600px]">
            {feedback && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-800 text-white px-6 py-2 rounded-full shadow-lg font-bold animate-bounce">
                    {feedback}
                </div>
            )}

            {isScanning ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400">
                    <Search size={64} className="mb-4 animate-pulse text-indigo-300"/>
                    <p className="text-xl">正在筛选可能的密码...</p>
                </div>
            ) : (
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                    {options.map((opt) => (
                        <button
                            key={opt}
                            disabled={isSolved}
                            onClick={() => handleGuess(opt)}
                            className={`p-3 rounded-xl font-bold text-lg shadow-sm transition-all active:scale-95 ${
                                isSolved && opt === n 
                                ? 'bg-green-500 text-white ring-4 ring-green-200 scale-110 z-10'
                                : 'bg-white text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-md'
                            }`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            )}
         </div>

      </div>

      {/* 3. Teacher Tip */}
      {(teacherTip || loadingTip) && (
        <div className="mt-8 bg-white border-l-4 border-indigo-500 p-6 rounded-r-xl shadow-md flex gap-4 animate-fade-in-up">
            <div className="text-4xl">🎓</div>
            <div>
                <h4 className="font-bold text-slate-800 mb-1">老师的小课堂</h4>
                <p className="text-slate-600 leading-relaxed">
                    {loadingTip ? '老师正在整理实验数据...' : teacherTip}
                </p>
            </div>
        </div>
      )}

      {/* Restart */}
      {isSolved && (
          <div className="mt-8 text-center">
              <button 
                onClick={() => startGame(lockType)} 
                className="px-8 py-3 bg-slate-800 text-white rounded-full font-bold hover:bg-slate-700 hover:scale-105 transition-all shadow-lg flex items-center gap-2 mx-auto"
              >
                  <RefreshCcw size={20}/> 再试一次
              </button>
          </div>
      )}
    </div>
  );
};

export default CryptoGame;