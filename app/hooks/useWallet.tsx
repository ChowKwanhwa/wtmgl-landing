'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface WalletContextType {
  walletAddress: string;
  isConnecting: boolean;
  connectWallet: (walletType: 'metamask' | 'okx' | 'tp') => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState(false);

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
    } catch (err: any) {
      console.error('连接钱包失败:', err);
      
      // 处理用户取消连接
      if (err.code === 4001 || err.code === 'ACTION_REJECTED') {
        // 用户取消，不显示错误
        console.log('用户取消了连接请求');
      } else if (err.message) {
        alert(`连接失败: ${err.message}`);
      } else {
        alert('连接钱包失败，请重试');
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress('');
  };

  return (
    <WalletContext.Provider value={{ walletAddress, isConnecting, connectWallet, disconnectWallet }}>
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
