'use client';

import Image from 'next/image';
import PrivateSale from './components/PrivateSale';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white">
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(251, 191, 36, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(251, 191, 36, 0.6);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out forwards;
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        }
      `}</style>
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-800/50 hover:bg-zinc-700 border border-zinc-700 hover:border-amber-500/30 transition-all group"
              title="返回顶部"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-zinc-400 group-hover:text-amber-400 transition-colors" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </a>
            <a href="#" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                我踏马归来
              </div>
            </a>
          </div>
          <div className="flex items-center gap-6">
            <a href="#private-sale" className="text-zinc-300 hover:text-amber-400 transition-colors">
              私募参与
            </a>
            <a href="#tokenomics" className="text-zinc-300 hover:text-amber-400 transition-colors">
              代币经济
            </a>
            <a href="#contract" className="text-zinc-300 hover:text-amber-400 transition-colors">
              合约信息
            </a>
            <a 
              href="#private-sale" 
              className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-400 font-bold rounded-lg transition-all"
            >
              立即参与
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-60">
          <Image
            src="/cz-horse.jpg"
            alt="CZ 踏马归来"
            fill
            className="object-cover object-[center_35%]"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="mb-8 inline-block px-4 py-2 bg-red-600/20 border border-red-500/50 rounded-full text-red-400 text-sm font-mono animate-pulse">
            🚨 BSC 主网 • 实时部署 🚨
          </div>
          
          <h1 className="text-5xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent drop-shadow-2xl">
            我踏马归来
          </h1>
          
          <div className="text-2xl md:text-4xl font-bold mb-8 text-zinc-300">
            再见CZ拉满弓，不惧岁月不惧风<br/>
            弟兄们我踏马来了
          </div>
          
          <div className="bg-red-950/60 border-2 border-red-500 rounded-lg p-6 mb-12 max-w-3xl mx-auto backdrop-blur">
            <p className="text-lg md:text-xl text-red-300 font-bold mb-2">
              ⚠️ BSC 战壕紧急呼叫 ⚠️
            </p>
            <p className="text-base md:text-lg text-zinc-200">
              Solana 军团已经发起猛攻！<br/>
              战壕的兄弟们要顶不住了！<br/>
              你们踏马来了吗？收到请回答！
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a 
              href="#private-sale"
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold rounded-lg transition-all text-lg transform hover:scale-105 shadow-lg"
            >
              立即参与私募 🚀
            </a>
            <a href="#contract" className="px-8 py-4 bg-zinc-800 hover:bg-zinc-700 border border-amber-500/30 font-bold rounded-lg transition-all text-lg">
              查看合约
            </a>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-zinc-900/70 backdrop-blur border border-amber-500/30 rounded-lg p-6">
              <div className="text-3xl font-bold text-amber-400">$WTMGL</div>
              <div className="text-zinc-400 text-sm mt-2">代币符号</div>
            </div>
            <div className="bg-zinc-900/70 backdrop-blur border border-amber-500/30 rounded-lg p-6">
              <div className="text-3xl font-bold text-amber-400">555万</div>
              <div className="text-zinc-400 text-sm mt-2">总供应量</div>
            </div>
            <div className="bg-zinc-900/70 backdrop-blur border border-amber-500/30 rounded-lg p-6">
              <div className="text-3xl font-bold text-amber-400">3.5%</div>
              <div className="text-zinc-400 text-sm mt-2">交易税</div>
            </div>
            <div className="bg-zinc-900/70 backdrop-blur border border-amber-500/30 rounded-lg p-6">
              <div className="text-3xl font-bold text-amber-400">BSC</div>
              <div className="text-zinc-400 text-sm mt-2">主链</div>
            </div>
          </div>
        </div>
      </section>

      {/* Private Sale Section */}
      <section id="private-sale" className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-amber-950/20 to-black"></div>
        <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.15) 0%, transparent 70%)'}}></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-amber-400 animate-glow">
              私 募 进 行 中
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6"></div>
            <p className="text-xl text-zinc-300 mb-2">
              BSC 战壕招募弟兄们，共同对抗 Solana 军团！
            </p>
            <div className="inline-block px-6 py-3 bg-red-950/40 border border-red-500/50 rounded-lg">
              <p className="text-red-400 font-bold text-lg">
                🔥 限量 500 份 • 每份 200 USDT 🔥
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 border-2 border-amber-500/50 rounded-2xl p-8 md:p-12 backdrop-blur-sm shadow-2xl">
            <PrivateSale />
          </div>

          <div className="mt-8 text-center">
            <p className="text-zinc-400 text-sm mb-4">
              ⚠️ 请确保钱包已连接到 BSC 主网并拥有足够的 USDT
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-zinc-500">
              <span>✓ 智能合约自动处理</span>
              <span>✓ 交易上链透明</span>
              <span>✓ 私募额度先到先得</span>
            </div>
          </div>
        </div>
      </section>

      {/* Battle Narrative Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-red-950/10 to-zinc-950/50"></div>
        <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(239, 68, 68, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(251, 191, 36, 0.1) 0%, transparent 50%)'}}></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-amber-400 animate-fadeInUp">
            战 况 速 报
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-16"></div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-red-950/40 to-zinc-950/60 border border-red-500/50 rounded-xl p-8 hover-lift backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-500/10 rounded-full blur-3xl group-hover:bg-red-500/20 transition-all duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="text-2xl">🔴</div>
                  <div className="text-red-400 font-mono text-sm">/// 敌军情报 ///</div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-red-400">Solana 军团猛攻</h3>
                <div className="mb-4 flex items-center gap-3">
                  <div className="text-4xl font-bold text-red-400">230万</div>
                  <div className="text-sm text-zinc-400">活跃地址</div>
                </div>
                <p className="text-zinc-300 leading-relaxed text-base">
                  过去24小时，Solana 军团活跃地址保持在 230 万左右。他们的攻势依然凶猛，正在对我方阵地发起强大冲锋！
                </p>
                <div className="mt-6 p-4 bg-red-950/40 rounded-lg border border-red-500/30 animate-glow">
                  <div className="flex items-center gap-2">
                    <span className="text-red-400 text-xl">⚠️</span>
                    <div className="text-red-400 font-bold">威胁等级：极高</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-amber-950/40 to-zinc-950/60 border border-amber-500/50 rounded-xl p-8 hover-lift backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="text-2xl">🟡</div>
                  <div className="text-amber-400 font-mono text-sm">/// 我军战报 ///</div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-amber-400">BSC 战壕反击</h3>
                <div className="mb-4 flex items-center gap-3">
                  <div className="text-4xl font-bold text-amber-400">290万</div>
                  <div className="text-sm text-zinc-400">活跃地址</div>
                </div>
                <p className="text-zinc-300 leading-relaxed text-base">
                  BSC 战壕报告：过去24小时活跃地址增长至 290 万区间！弟兄们回归 BSC 战壕的数据在显著提升，但还需要上等兵 CZ 带领弟兄们继续冲锋！
                </p>
                <div className="mt-6 p-4 bg-amber-950/40 rounded-lg border border-amber-500/30 animate-glow">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 text-xl">📈</span>
                    <div className="text-amber-400 font-bold">战况：需要增援</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 bg-gradient-to-r from-red-900/30 to-red-950/30 border-2 border-red-500 rounded-xl p-10 text-center relative overflow-hidden backdrop-blur-sm animate-glow">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.1),transparent_70%)]"></div>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse"></div>
            
            <div className="relative z-10">
              <div className="text-red-400 font-mono text-sm mb-6 flex items-center justify-center gap-2">
                <span className="animate-pulse">🚨</span>
                <span>/// 紧急呼叫 ///</span>
                <span className="animate-pulse">🚨</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-3 text-red-400 animate-pulse">BSC 战壕呼叫各位大兵</h3>
              <h3 className="text-3xl md:text-4xl font-bold mb-3 text-red-400 animate-pulse" style={{animationDelay: '0.2s'}}>BSC 战壕呼叫各位大兵</h3>
              <h3 className="text-3xl md:text-4xl font-bold mb-8 text-red-400 animate-pulse" style={{animationDelay: '0.4s'}}>BSC 战壕呼叫各位大兵</h3>
              <p className="text-xl md:text-2xl text-zinc-200 mb-8 leading-relaxed">
                我们需要面对 Solana 军团强大的冲锋，并干翻他们！
              </p>
              <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-6 animate-float">
                你们踏马来了吗？
              </div>
              <div className="text-xl md:text-2xl text-red-400 font-bold animate-pulse">
                收到请回答！收到请回答！
              </div>
            </div>
          </div>
          
          <div className="mt-8 bg-gradient-to-r from-amber-900/30 to-amber-950/30 border-2 border-amber-500 rounded-xl p-10 text-center relative overflow-hidden backdrop-blur-sm hover-lift">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1),transparent_70%)]"></div>
            
            <div className="relative z-10">
              <div className="text-amber-400 font-mono text-sm mb-4 flex items-center justify-center gap-2">
                <span>📡</span>
                <span>/// 呼叫上等兵 CZ ///</span>
                <span>📡</span>
              </div>
              <a 
                href="https://x.com/cz_binance" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block text-3xl md:text-4xl font-bold mb-6 text-amber-400 hover:text-amber-300 transition-all hover:scale-105"
              >
                @CZ_Binance
              </a>
              <p className="text-xl text-zinc-300 mb-6 leading-relaxed">
                对面 Solana 军团已经发起猛攻了！<br/>
                战壕的兄弟们要顶不住了！<br/>
                呼叫 CZ 速速归位带领弟兄们干翻他们！
              </p>
              <div className="text-2xl md:text-3xl font-bold text-amber-400 animate-float">
                再见CZ拉满弓，不惧岁月不惧风 🏹
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section id="tokenomics" className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-amber-950/10 to-black"></div>
        <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(251, 191, 36, 0.05) 0%, transparent 50%)'}}></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-amber-400">
            作 战 策 略
          </h2>
          <p className="text-center text-zinc-400 mb-8">代币经济学</p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-16"></div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-amber-950/30 to-zinc-950/50 border border-amber-500/40 rounded-xl p-8 hover-lift backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="text-6xl mb-6 animate-float">💰</div>
                <h3 className="text-2xl font-bold mb-6 text-amber-400">买入税：3.5%</h3>
                <ul className="space-y-4">
                  <li className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-amber-500/20 hover:border-amber-500/50 transition-colors">
                    <span className="text-zinc-300">营销推广</span>
                    <span className="text-amber-400 font-bold">1.5%</span>
                  </li>
                  <li className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-amber-500/20 hover:border-amber-500/50 transition-colors">
                    <span className="text-zinc-300">USDT 分红</span>
                    <span className="text-amber-400 font-bold">1.5%</span>
                  </li>
                  <li className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-amber-500/20 hover:border-amber-500/50 transition-colors">
                    <span className="text-zinc-300">流动性回流</span>
                    <span className="text-amber-400 font-bold">0.5%</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-amber-950/30 to-zinc-950/50 border border-amber-500/40 rounded-xl p-8 hover-lift backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="text-6xl mb-6 animate-float" style={{animationDelay: '0.5s'}}>📊</div>
                <h3 className="text-2xl font-bold mb-6 text-amber-400">卖出税：3.5%</h3>
                <ul className="space-y-4">
                  <li className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-amber-500/20 hover:border-amber-500/50 transition-colors">
                    <span className="text-zinc-300">营销推广</span>
                    <span className="text-amber-400 font-bold">1.5%</span>
                  </li>
                  <li className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-amber-500/20 hover:border-amber-500/50 transition-colors">
                    <span className="text-zinc-300">USDT 分红</span>
                    <span className="text-amber-400 font-bold">1.5%</span>
                  </li>
                  <li className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-amber-500/20 hover:border-amber-500/50 transition-colors">
                    <span className="text-zinc-300">流动性回流</span>
                    <span className="text-amber-400 font-bold">0.5%</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-950/30 to-zinc-950/50 border border-green-500/40 rounded-xl p-8 hover-lift backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="text-6xl mb-6 animate-float" style={{animationDelay: '1s'}}>🎁</div>
                <h3 className="text-2xl font-bold mb-6 text-green-400">LP 持币奖励</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 p-3 bg-black/30 rounded-lg border border-green-500/20 hover:border-green-500/50 transition-colors">
                    <span className="text-green-400">✓</span>
                    <span className="text-zinc-300">自动 USDT 分红</span>
                  </li>
                  <li className="flex items-center gap-3 p-3 bg-black/30 rounded-lg border border-green-500/20 hover:border-green-500/50 transition-colors">
                    <span className="text-green-400">✓</span>
                    <span className="text-zinc-300">持有即可赚取</span>
                  </li>
                  <li className="flex items-center gap-3 p-3 bg-black/30 rounded-lg border border-green-500/20 hover:border-green-500/50 transition-colors">
                    <span className="text-green-400">✓</span>
                    <span className="text-zinc-300">被动收益躺赢</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contract Section */}
      <section id="contract" className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-black to-zinc-950/50"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-amber-400">
            合 约 信 息
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-16"></div>
          
          <div className="bg-gradient-to-br from-zinc-900/60 to-zinc-950/60 border-2 border-amber-500/40 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-amber-500/5 rounded-full blur-3xl"></div>
            
            <div className="space-y-6 relative z-10">
              <div className="hover-lift p-1 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-500/10">
                <div className="bg-zinc-900/90 p-6 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">📜</span>
                    <div className="text-amber-400 font-bold">合约地址</div>
                  </div>
                  <div className="bg-black/50 p-4 rounded-lg font-mono text-sm break-all text-amber-400 border border-amber-500/30 hover:border-amber-500/60 transition-colors">
                    0x15C3Ab6135873c84F3a58BE05B6DA4421630eF6C
                  </div>
                </div>
              </div>
              
              <div className="hover-lift p-1 rounded-xl bg-gradient-to-r from-zinc-500/20 to-zinc-500/10">
                <div className="bg-zinc-900/90 p-6 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">👤</span>
                    <div className="text-zinc-400 font-bold">部署者地址</div>
                  </div>
                  <div className="bg-black/50 p-4 rounded-lg font-mono text-sm break-all text-zinc-300 border border-zinc-700 hover:border-zinc-500 transition-colors">
                    0x201bb391c84b710fc745f6ec033d6d0840f0b6c4
                  </div>
                </div>
              </div>
              
              <div className="hover-lift p-1 rounded-xl bg-gradient-to-r from-zinc-500/20 to-zinc-500/10">
                <div className="bg-zinc-900/90 p-6 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">💼</span>
                    <div className="text-zinc-400 font-bold">营销钱包地址</div>
                  </div>
                  <div className="bg-black/50 p-4 rounded-lg font-mono text-sm break-all text-zinc-300 border border-zinc-700 hover:border-zinc-500 transition-colors">
                    0x8d7f0d7ab3e2f41b4c737a691adf115a35133414
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-zinc-800">
                <a 
                  href="https://bscscan.com/address/0x15C3Ab6135873c84F3a58BE05B6DA4421630eF6C" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-amber-500/50"
                >
                  <span>🔍</span>
                  <span>在 BSCScan 查看</span>
                </a>
                <a 
                  href="#private-sale"
                  className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg"
                >
                  <span>🚀</span>
                  <span>参与私募</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950/50 to-black"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-amber-400">
            战 略 盟 友
          </h2>
          <p className="text-center text-zinc-400 mb-8">与顶级机构并肩作战</p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-16"></div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-amber-950/30 to-zinc-950/50 border border-amber-500/40 rounded-2xl p-10 text-center hover-lift backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative z-10">
                <div className="text-6xl mb-6 animate-float">🏦</div>
                <h3 className="text-2xl font-bold mb-3 text-amber-400">Binance Labs</h3>
                <div className="w-16 h-0.5 bg-amber-500/50 mx-auto mb-3"></div>
                <p className="text-zinc-400">战略顾问</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-amber-950/30 to-zinc-950/50 border border-amber-500/40 rounded-2xl p-10 text-center hover-lift backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative z-10">
                <div className="text-6xl mb-6 animate-float" style={{animationDelay: '0.5s'}}>🥞</div>
                <h3 className="text-2xl font-bold mb-3 text-amber-400">PancakeSwap</h3>
                <div className="w-16 h-0.5 bg-amber-500/50 mx-auto mb-3"></div>
                <p className="text-zinc-400">DEX 合作伙伴</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-950/30 to-zinc-950/50 border border-blue-500/40 rounded-2xl p-10 text-center hover-lift backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative z-10">
                <div className="text-6xl mb-6 animate-float" style={{animationDelay: '1s'}}>🛡️</div>
                <h3 className="text-2xl font-bold mb-3 text-blue-400">CertiK</h3>
                <div className="w-16 h-0.5 bg-blue-500/50 mx-auto mb-3"></div>
                <p className="text-zinc-400">安全审计</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-amber-950/10 to-zinc-950/50"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-amber-400">
            作 战 路 线 图
          </h2>
          <p className="text-center text-zinc-400 mb-8">通往胜利的征程</p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-16"></div>
          
          <div className="space-y-8 relative">
            <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-gradient-to-b from-amber-500 via-amber-500/50 to-amber-500/20"></div>
            
            <div className="flex gap-6 relative hover-lift">
              <div className="flex flex-col items-center relative z-10">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center font-bold text-black shadow-lg shadow-amber-500/50 animate-glow">
                  <span className="text-lg">✓</span>
                </div>
              </div>
              <div className="flex-1 pb-8 bg-gradient-to-r from-amber-950/30 to-transparent border-l-4 border-amber-500 pl-6 py-4 rounded-r-lg backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-2xl font-bold text-amber-400">2026 Q1</h3>
                  <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full text-xs text-amber-400 font-bold">部署阶段</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-zinc-300"><span className="text-green-400 font-bold">✓</span> BSC 主网合约部署</li>
                  <li className="flex items-center gap-2 text-zinc-300"><span className="text-green-400 font-bold">✓</span> PancakeSwap 上线</li>
                  <li className="flex items-center gap-2 text-zinc-300"><span className="text-green-400 font-bold">✓</span> LP 分红激活</li>
                </ul>
              </div>
            </div>
            
            <div className="flex gap-6 relative hover-lift">
              <div className="flex flex-col items-center relative z-10">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500/50 to-amber-600/50 border-2 border-amber-500 rounded-full flex items-center justify-center font-bold text-amber-400 shadow-lg">
                  <span>2</span>
                </div>
              </div>
              <div className="flex-1 pb-8 bg-gradient-to-r from-amber-950/20 to-transparent border-l-4 border-amber-500/50 pl-6 py-4 rounded-r-lg backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-2xl font-bold text-amber-400">2026 Q2</h3>
                  <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full text-xs text-amber-400 font-bold">扩张阶段</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-zinc-300"><span className="text-amber-400">→</span> CMC & CoinGecko 上币</li>
                  <li className="flex items-center gap-2 text-zinc-300"><span className="text-amber-400">→</span> 持币地址突破 1 万</li>
                  <li className="flex items-center gap-2 text-zinc-300"><span className="text-amber-400">→</span> 启动营销推广战役</li>
                </ul>
              </div>
            </div>
            
            <div className="flex gap-6 relative hover-lift">
              <div className="flex flex-col items-center relative z-10">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500/50 to-amber-600/50 border-2 border-amber-500 rounded-full flex items-center justify-center font-bold text-amber-400 shadow-lg">
                  <span>3</span>
                </div>
              </div>
              <div className="flex-1 pb-8 bg-gradient-to-r from-amber-950/20 to-transparent border-l-4 border-amber-500/50 pl-6 py-4 rounded-r-lg backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-2xl font-bold text-amber-400">2026 Q3</h3>
                  <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full text-xs text-amber-400 font-bold">统治阶段</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-zinc-300"><span className="text-amber-400">→</span> 中心化交易所上线</li>
                  <li className="flex items-center gap-2 text-zinc-300"><span className="text-amber-400">→</span> 跨链桥接功能</li>
                  <li className="flex items-center gap-2 text-zinc-300"><span className="text-amber-400">→</span> BSC 生态战略合作</li>
                </ul>
              </div>
            </div>
            
            <div className="flex gap-6 relative hover-lift">
              <div className="flex flex-col items-center relative z-10">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500/50 to-amber-600/50 border-2 border-amber-500 rounded-full flex items-center justify-center font-bold text-amber-400 shadow-lg">
                  <span>4</span>
                </div>
              </div>
              <div className="flex-1 bg-gradient-to-r from-amber-950/20 to-transparent border-l-4 border-amber-500/50 pl-6 py-4 rounded-r-lg backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-2xl font-bold text-amber-400">2026 Q4</h3>
                  <span className="px-3 py-1 bg-green-500/20 border border-green-500/40 rounded-full text-xs text-green-400 font-bold">胜利阶段 🏆</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-zinc-300"><span className="text-amber-400">→</span> 持币地址突破 10 万</li>
                  <li className="flex items-center gap-2 text-zinc-300"><span className="text-amber-400">→</span> 主流交易所上线</li>
                  <li className="flex items-center gap-2 text-zinc-300"><span className="text-amber-400">→</span> 成为 BSC 链霸主</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/20 to-black"></div>
        <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.1) 0%, transparent 70%)'}}></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="bg-gradient-to-br from-red-950/40 to-amber-950/40 border-2 border-amber-500 rounded-3xl p-12 md:p-16 backdrop-blur-sm relative overflow-hidden shadow-2xl shadow-amber-500/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1),transparent_70%)]"></div>
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-amber-500/20 rounded-full blur-3xl animate-float"></div>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-red-500/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
            
            <div className="relative z-10">
              <div className="text-6xl mb-6 animate-float">🐴⚡</div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 text-amber-400 animate-glow">
                加入战斗！
              </h2>
              <p className="text-2xl md:text-3xl text-zinc-100 mb-4 leading-relaxed font-bold">
                BSC 战壕需要你！
              </p>
              <p className="text-lg md:text-xl text-zinc-300 mb-10 max-w-2xl mx-auto">
                购买 $WTMGL，与 CZ 并肩作战，干翻 Solana 军团！
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                <a 
                  href="#private-sale"
                  className="px-10 py-5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold rounded-xl transition-all text-lg transform hover:scale-105 shadow-lg hover:shadow-amber-500/50"
                >
                  <span className="flex items-center justify-center gap-2">
                    <span>🚀</span>
                    <span>立即参与私募</span>
                  </span>
                </a>
                <a 
                  href="https://t.me/wotamaguilai" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border-2 border-blue-500 font-bold rounded-xl transition-all text-lg transform hover:scale-105 shadow-lg hover:shadow-blue-500/50"
                >
                  <span className="flex items-center justify-center gap-2">
                    <span>✈️</span>
                    <span>加入电报群</span>
                  </span>
                </a>
              </div>
              <div className="mt-8 p-6 bg-black/30 rounded-2xl border border-amber-500/30">
                <div className="text-3xl md:text-4xl font-bold text-amber-400 animate-float mb-2">
                  你踏马来了吗？
                </div>
                <div className="text-zinc-400">收到请回答！</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto text-center text-zinc-400">
          <p className="mb-4 text-lg">© 2026 我踏马归来 (WTMGL). 版权所有</p>
          <p className="text-sm text-zinc-500 mb-2">
            这是一个娱乐性质的 meme 代币，投资前请务必 DYOR（自己做研究）
          </p>
          <p className="text-xs text-zinc-600">
            再见CZ拉满弓，不惧岁月不惧风 • 弟兄们我踏马来了
          </p>
        </div>
      </footer>
    </div>
  );
}
