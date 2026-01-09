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
        // MetaMask: 检查是否是真正的 MetaMask
        const providers = (window as any).ethereum?.providers;
        if (providers) {
          // 多钱包环境，找到 MetaMask
          ethereum = providers.find((p: any) => p.isMetaMask && !p.isOkxWallet);
        } else if ((window as any).ethereum?.isMetaMask && !(window as any).ethereum?.isOkxWallet) {
          ethereum = (window as any).ethereum;
        }
        
        if (!ethereum) {
          alert('请先安装 MetaMask 钱包，或者禁用其他钱包扩展');
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
      alert(err.message || '连接钱包失败');
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
