'use client';

import { useState } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { formatUnits, parseUnits } from 'viem';

const PRIVATE_SALE_ADDRESS = '0xd84aD221Fb91119166C81Eb633eE7736b98b9Ecb';
const USDT_BSC_ADDRESS = '0x55d398326f99059fF775485246999027B3197955';
const AMOUNT_PER_SHARE = '200'; // 200 USDT
const TOTAL_SHARES = 500;

export default function PrivateSaleRainbow() {
  const { address: walletAddress, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [isSending, setIsSending] = useState(false);
  const [txHash, setTxHash] = useState<string>('');
  const [error, setError] = useState<string>('');

  const participatePrivateSale = async () => {
    if (!isConnected || !walletAddress) {
      setError('请先连接钱包');
      return;
    }

    if (!walletClient) {
      setError('钱包客户端未就绪');
      return;
    }

    setIsSending(true);
    setError('');
    setTxHash('');

    try {
      // USDT has 18 decimals on BSC
      const amountInWei = parseUnits(AMOUNT_PER_SHARE, 18);
      
      // ERC20 transfer function encoding
      const addressParam = PRIVATE_SALE_ADDRESS.slice(2).toLowerCase().padStart(64, '0');
      const amountParam = amountInWei.toString(16).padStart(64, '0');
      const functionSelector = 'a9059cbb';
      const data = `0x${functionSelector}${addressParam}${amountParam}` as `0x${string}`;
      
      console.log('发送交易:', {
        from: walletAddress,
        to: USDT_BSC_ADDRESS,
        data: data,
      });
      
      const hash = await walletClient.sendTransaction({
        account: walletAddress,
        to: USDT_BSC_ADDRESS as `0x${string}`,
        data: data,
        gas: BigInt(100000),
        value: BigInt(0),
      });

      setTxHash(hash);
      
    } catch (err: any) {
      // 检查是否是用户取消（各种可能的形式）
      const isUserRejection = 
        err?.code === 4001 || 
        err?.code === 'ACTION_REJECTED' ||
        err === 0 || 
        err === '0' ||
        err?.message === '0' ||
        err?.message?.toLowerCase()?.includes('user rejected') ||
        err?.message?.toLowerCase()?.includes('user denied') ||
        err?.message?.toLowerCase()?.includes('cancel') ||
        err?.name === 'TransactionExecutionError';
      
      if (isUserRejection) {
        // 用户取消，什么都不做
        console.log('用户取消了交易请求');
        return;
      }
      
      // 不是用户取消，才记录错误
      console.error('交易失败:', err);
      
      if (err?.message) {
        setError(`交易失败: ${err.message}`);
      } else {
        setError('交易失败，请重试');
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6">
      {!isConnected ? (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-center mb-6 text-amber-400">
            连接钱包参与私募
          </h3>
          
          <p className="text-center text-zinc-400">
            请使用右上角的按钮连接钱包
          </p>
        </div>
      ) : (
        <div className="space-y-4">
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
