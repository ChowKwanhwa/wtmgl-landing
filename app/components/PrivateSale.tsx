'use client';

import { useState } from 'react';

const PRIVATE_SALE_ADDRESS = '0xd84aD221Fb91119166C81Eb633eE7736b98b9Ecb';
const USDT_BSC_ADDRESS = '0x55d398326f99059fF775485246999027B3197955';
const AMOUNT_PER_SHARE = '200'; // 200 USDT
const TOTAL_SHARES = 500;

// USDT ERC20 ABI (only transfer function needed)
const USDT_ABI = [
  {
    constant: false,
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    type: 'function'
  }
];

export default function PrivateSale() {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [txHash, setTxHash] = useState<string>('');
  const [error, setError] = useState<string>('');

  const connectWallet = async (walletType: 'metamask' | 'okx' | 'tp') => {
    setIsConnecting(true);
    setError('');
    
    try {
      let ethereum;
      
      if (walletType === 'metamask') {
        ethereum = (window as any).ethereum;
      } else if (walletType === 'okx') {
        ethereum = (window as any).okxwallet;
      } else if (walletType === 'tp') {
        ethereum = (window as any).ethereum; // TP wallet also uses window.ethereum
      }

      if (!ethereum) {
        setError(`请先安装 ${walletType === 'metamask' ? 'MetaMask' : walletType === 'okx' ? 'OKX' : 'TP'} 钱包`);
        setIsConnecting(false);
        return;
      }

      // Request account access
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      
      // Check if on BSC network (chainId 56)
      const chainId = await ethereum.request({ method: 'eth_chainId' });
      
      if (chainId !== '0x38') { // 0x38 = 56 (BSC Mainnet)
        try {
          await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x38' }],
          });
        } catch (switchError: any) {
          if (switchError.code === 4902) {
            // Chain not added, add BSC network
            await ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: '0x38',
                chainName: 'BNB Smart Chain',
                nativeCurrency: {
                  name: 'BNB',
                  symbol: 'BNB',
                  decimals: 18
                },
                rpcUrls: ['https://bsc-dataseed.binance.org/'],
                blockExplorerUrls: ['https://bscscan.com/']
              }]
            });
          } else {
            throw switchError;
          }
        }
      }

      setWalletAddress(accounts[0]);
    } catch (err: any) {
      setError(err.message || '连接钱包失败');
    } finally {
      setIsConnecting(false);
    }
  };

  const participatePrivateSale = async () => {
    if (!walletAddress) {
      setError('请先连接钱包');
      return;
    }

    setIsSending(true);
    setError('');
    setTxHash('');

    try {
      const ethereum = (window as any).ethereum || (window as any).okxwallet;
      
      // USDT has 18 decimals on BSC
      const amountInWei = (parseFloat(AMOUNT_PER_SHARE) * 1e18).toString(16);
      
      // Encode transfer function call
      const transferData = ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: walletAddress,
          to: USDT_BSC_ADDRESS,
          data: `0xa9059cbb${PRIVATE_SALE_ADDRESS.slice(2).padStart(64, '0')}${amountInWei.padStart(64, '0')}`,
          gas: '0x186A0', // 100000 gas
        }]
      });

      const hash = await transferData;
      setTxHash(hash);
      
    } catch (err: any) {
      setError(err.message || '交易失败');
    } finally {
      setIsSending(false);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress('');
    setTxHash('');
    setError('');
  };

  return (
    <div className="space-y-6">
      {/* Wallet Connection Buttons */}
      {!walletAddress ? (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-center mb-6 text-amber-400">
            连接钱包参与私募
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => connectWallet('metamask')}
              disabled={isConnecting}
              className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-2xl">🦊</span>
              <span>MetaMask</span>
            </button>

            <button
              onClick={() => connectWallet('okx')}
              disabled={isConnecting}
              className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-black to-zinc-800 hover:from-zinc-800 hover:to-zinc-700 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-2xl">⭕</span>
              <span>OKX Wallet</span>
            </button>

            <button
              onClick={() => connectWallet('tp')}
              disabled={isConnecting}
              className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-2xl">🔵</span>
              <span>TP Wallet</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Connected Wallet Info */}
          <div className="bg-green-950/30 border border-green-500/40 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-green-400 text-sm mb-1">已连接钱包</div>
                <div className="text-white font-mono text-sm break-all">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </div>
              </div>
              <button
                onClick={disconnectWallet}
                className="px-4 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-colors"
              >
                断开连接
              </button>
            </div>
          </div>

          {/* Private Sale Info */}
          <div className="bg-gradient-to-br from-amber-950/40 to-zinc-950/60 border-2 border-amber-500/40 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-amber-400 mb-6 text-center">
              私募信息
            </h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center p-4 bg-black/30 rounded-lg">
                <span className="text-zinc-300">每份价格</span>
                <span className="text-amber-400 font-bold text-xl">{AMOUNT_PER_SHARE} USDT</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-black/30 rounded-lg">
                <span className="text-zinc-300">总份数</span>
                <span className="text-amber-400 font-bold text-xl">{TOTAL_SHARES} 份</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-black/30 rounded-lg">
                <span className="text-zinc-300">接收地址</span>
                <span className="text-zinc-400 font-mono text-xs break-all">
                  {PRIVATE_SALE_ADDRESS.slice(0, 10)}...{PRIVATE_SALE_ADDRESS.slice(-8)}
                </span>
              </div>
            </div>

            {/* Participate Button */}
            <button
              onClick={participatePrivateSale}
              disabled={isSending}
              className="w-full py-5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-lg rounded-xl transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSending ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  <span>交易确认中...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span>🚀</span>
                  <span>立即参与私募（{AMOUNT_PER_SHARE} USDT）</span>
                </span>
              )}
            </button>
          </div>

          {/* Transaction Hash */}
          {txHash && (
            <div className="bg-green-950/30 border border-green-500/40 rounded-xl p-6 animate-fadeInUp">
              <div className="text-green-400 font-bold mb-2 flex items-center gap-2">
                <span>✅</span>
                <span>交易已提交！</span>
              </div>
              <div className="text-sm text-zinc-300 mb-3">
                交易哈希：
              </div>
              <a
                href={`https://bscscan.com/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 font-mono text-xs break-all underline"
              >
                {txHash}
              </a>
              <div className="mt-4 text-sm text-zinc-400">
                请在 BSCScan 上查看交易状态
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-950/30 border border-red-500/40 rounded-xl p-4 animate-fadeInUp">
              <div className="text-red-400 flex items-center gap-2">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
