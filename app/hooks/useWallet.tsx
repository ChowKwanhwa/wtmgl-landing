'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface WalletContextType {
  walletAddress: string;
  isConnecting: boolean;
  connectedProvider: any;
  connectWallet: (walletType: 'metamask' | 'okx' | 'tp') => Promise<void>;
  switchAccount: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedProvider, setConnectedProvider] = useState<any>(null);

  const connectWallet = async (walletType: 'metamask' | 'okx' | 'tp') => {
    setIsConnecting(true);
    
    try {
      let ethereum;
      
      if (walletType === 'okx') {
        // OKX Wallet 优先使用 okxwallet 对象
        ethereum = (window as any).okxwallet;
        if (!ethereum) {
          alert('请先安装 OKX Wallet 钱包');
          setIsConnecting(false);
          return;
        }
      } else if (walletType === 'metamask') {
        // MetaMask: 需要特别处理多钱包环境
        const providers = (window as any).ethereum?.providers;
        
        if (providers && Array.isArray(providers)) {
          // 多钱包环境，找到真正的 MetaMask
          ethereum = providers.find((p: any) => {
            // 必须是 MetaMask 且不是 OKX
            return p.isMetaMask && !p.isOkxWallet && !p.isOKExWallet;
          });
        } 
        
        // 如果没找到，尝试直接使用 window.ethereum（仅当它是 MetaMask）
        if (!ethereum && (window as any).ethereum) {
          const eth = (window as any).ethereum;
          if (eth.isMetaMask && !eth.isOkxWallet && !eth.isOKExWallet) {
            ethereum = eth;
          }
        }
        
        if (!ethereum) {
          alert('未检测到 MetaMask 钱包。\n\n如果已安装 MetaMask，请尝试：\n1. 禁用 OKX 钱包扩展\n2. 刷新页面后重试\n3. 或使用 OKX 钱包连接');
          setIsConnecting(false);
          return;
        }
      } else if (walletType === 'tp') {
        // TokenPocket: 检查 isTokenPocket 或 isTp
        const providers = (window as any).ethereum?.providers;
        if (providers) {
          ethereum = providers.find((p: any) => p.isTokenPocket || p.isTp);
        } else if ((window as any).ethereum?.isTokenPocket || (window as any).ethereum?.isTp) {
          ethereum = (window as any).ethereum;
        } else if ((window as any).tokenpocket?.ethereum) {
          ethereum = (window as any).tokenpocket.ethereum;
        }
        
        if (!ethereum) {
          alert('请先安装 TokenPocket 钱包');
          setIsConnecting(false);
          return;
        }
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      
      const chainId = await ethereum.request({ method: 'eth_chainId' });
      
      if (chainId !== '0x38') {
        try {
          await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x38' }],
          });
        } catch (switchError: any) {
          if (switchError.code === 4902) {
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
      setConnectedProvider(ethereum);
    } catch (err: any) {
      // 先检查是否是用户取消（检查各种可能的形式）
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
        console.log('用户取消了连接请求');
        return;
      }
      
      // 不是用户取消，才记录错误
      console.error('连接钱包失败:', err);
      console.error('错误详情:', {
        type: typeof err,
        code: err?.code,
        message: err?.message,
        fullError: err
      });
      
      // 显示错误提示
      if (typeof err === 'number' && err !== 0) {
        alert(`连接失败，错误代码: ${err}`);
      } else if (err?.message && err.message !== '0') {
        alert(`连接失败: ${err.message}`);
      } else if (typeof err === 'string') {
        alert(`连接失败: ${err}`);
      } else {
        alert('连接钱包失败，请重试');
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const switchAccount = async () => {
    console.log('🔄 switchAccount 被调用');
    console.log('connectedProvider:', connectedProvider);
    console.log('当前地址:', walletAddress);
    
    if (!connectedProvider) {
      console.error('❌ 没有连接的 provider');
      alert('请先连接钱包');
      return;
    }

    try {
      console.log('📡 正在请求账号切换...');
      
      // 请求用户在钱包中选择账号
      const accounts = await connectedProvider.request({ 
        method: 'eth_requestAccounts' 
      });
      
      console.log('✅ 收到账号列表:', accounts);
      
      if (accounts && accounts[0]) {
        if (accounts[0] !== walletAddress) {
          // 用户选择了新账号，更新状态
          setWalletAddress(accounts[0]);
          console.log('✅ 切换到新账号:', accounts[0]);
        } else {
          console.log('ℹ️ 用户选择了相同的账号');
        }
      }
    } catch (err: any) {
      console.error('❌ switchAccount 错误:', err);
      
      // 检查是否是用户取消
      if (
        err?.code === 4001 || 
        err === 0 || 
        err === '0' ||
        err?.message === '0'
      ) {
        console.log('用户取消了切换账号');
        return;
      }
      
      console.error('切换账号失败:', err);
      alert(`切换账号失败: ${err.message || err}`);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress('');
    setConnectedProvider(null);
  };

  return (
    <WalletContext.Provider value={{ walletAddress, isConnecting, connectedProvider, connectWallet, switchAccount, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
