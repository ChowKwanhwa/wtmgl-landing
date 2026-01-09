'use client';

import { useState } from 'react';
import { useWallet } from '../hooks/useWallet';

const PRIVATE_SALE_ADDRESS = '0xd84aD221Fb91119166C81Eb633eE7736b98b9Ecb';
const USDT_BSC_ADDRESS = '0x55d398326f99059fF775485246999027B3197955';
const AMOUNT_PER_SHARE = '200'; // 200 USDT
const TOTAL_SHARES = 500;

export default function PrivateSale() {
  const { walletAddress, isConnecting, connectWallet, connectedProvider } = useWallet();
  const [isSending, setIsSending] = useState(false);
  const [txHash, setTxHash] = useState<string>('');
  const [error, setError] = useState<string>('');

  const participatePrivateSale = async () => {
    if (!walletAddress) {
      setError('请先连接钱包');
      return;
    }

    if (!connectedProvider) {
      setError('钱包连接已断开，请重新连接');
      return;
    }

    setIsSending(true);
    setError('');
    setTxHash('');

    try {
      const ethereum = connectedProvider;
      
      // USDT has 18 decimals on BSC
      const amountInWei = BigInt(parseFloat(AMOUNT_PER_SHARE) * 1e18);
      
      // 移除 0x 前缀并转为小写
      let addressHex = PRIVATE_SALE_ADDRESS.slice(2).toLowerCase();
      // 确保地址是40个字符（20字节）
      if (addressHex.length !== 40) {
        throw new Error('Invalid address length');
      }
      // 左填充到64个字符（32字节）
      const addressParam = addressHex.padStart(64, '0');
      
      // 转换金额为十六进制并左填充到64个字符
      const amountParam = amountInWei.toString(16).padStart(64, '0');
      
      // ERC20 transfer 函数编码
      // 函数选择器: 0xa9059cbb (transfer(address,uint256) 的 keccak256 前4字节)
      const functionSelector = 'a9059cbb';
      const data = `0x${functionSelector}${addressParam}${amountParam}`;
      
      console.log('发送交易:', {
        from: walletAddress,
        to: USDT_BSC_ADDRESS,
        data: data,
        decodedAddress: `0x${addressHex}`,
        decodedAmount: amountInWei.toString(),
        fullData: {
          selector: functionSelector,
          addressParam,
          amountParam
        }
      });
      
      const hash = await ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: walletAddress,
          to: USDT_BSC_ADDRESS,
          data: data,
          gas: '0x186A0', // 100000 gas
          value: '0x0', // 不发送 BNB
        }]
      });

      setTxHash(hash);
      
    } catch (err: any) {
      // 先检查是否是用户取消（各种可能的形式）
      if (
        err?.code === 4001 || 
        err?.code === 'ACTION_REJECTED' ||
        err === 0 ||
        err === '0' ||
        err?.message === '0' ||
        err?.message?.toLowerCase()?.includes('user rejected') ||
        err?.message?.toLowerCase()?.includes('user denied') ||
        err?.message?.toLowerCase()?.includes('cancel')
      ) {
        // 用户取消，什么都不做，直接返回
        console.log('用户取消了交易请求');
        return;
      }
      
      // 不是用户取消，才记录错误
      console.error('交易失败:', err);
      console.error('错误详情:', {
        type: typeof err,
        code: err?.code,
        message: err?.message,
        data: err?.data,
        stack: err?.stack,
        fullError: err
      });
      
      // 显示错误提示
      if (typeof err === 'number' && err !== 0) {
        setError(`交易失败，错误代码: ${err}`);
      } else if (err?.message && err.message !== '0') {
        setError(`交易失败: ${err.message}`);
      } else if (typeof err === 'string') {
        setError(`交易失败: ${err}`);
      } else {
        setError('交易失败，请重试');
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Wallet Connection Buttons */}
      {!walletAddress ? (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-center mb-6 text-amber-400">
            连接钱包参与私募
          </h3>
          
          <p className="text-center text-zinc-400 mb-4">
            请先从右上角连接钱包
          </p>
          
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
