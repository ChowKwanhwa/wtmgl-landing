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
      
      if (walletType === 'metamask') {
        ethereum = (window as any).ethereum;
      } else if (walletType === 'okx') {
        ethereum = (window as any).okxwallet;
      } else if (walletType === 'tp') {
        ethereum = (window as any).ethereum;
      }

      if (!ethereum) {
        alert(`请先安装 ${walletType === 'metamask' ? 'MetaMask' : walletType === 'okx' ? 'OKX' : 'TP'} 钱包`);
        setIsConnecting(false);
        return;
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
