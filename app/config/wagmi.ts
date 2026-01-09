import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { bsc } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: '我踏马归来',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // 可以从 https://cloud.walletconnect.com 获取
  chains: [bsc],
  ssr: true, // Next.js App Router
});
