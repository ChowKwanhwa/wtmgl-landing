# 钱包扩展冲突问题说明

## MetaMask 被 OKX 拦截的问题

当浏览器同时安装了 MetaMask 和 OKX Wallet 扩展时，由于两者都会注入 `window.ethereum` 对象，可能会出现钱包冲突的情况。

### 解决方案

**方案 1：使用独立的浏览器配置文件（推荐）**
1. 创建新的 Chrome/Edge 配置文件
2. 只在该配置文件安装 MetaMask
3. 使用该配置文件访问网站

**方案 2：临时禁用 OKX 扩展**
1. 进入浏览器扩展管理页面
2. 临时禁用 OKX Wallet
3. 刷新页面后连接 MetaMask
4. 连接成功后可以重新启用 OKX

**方案 3：直接使用 OKX Wallet**
- OKX Wallet 完全支持 BSC 网络
- 功能与 MetaMask 相同
- 可以正常完成私募交易

### 技术说明

我们的代码已经实现了钱包识别逻辑：
- 通过 `window.ethereum.providers` 数组查找特定钱包
- 检查 `isMetaMask` 和 `!isOkxWallet` 标识
- 但由于浏览器扩展的注入顺序和优先级问题，仍可能被覆盖

### 测试建议

为了确保最佳体验，建议：
1. 使用 OKX Wallet 进行私募（最简单）
2. 或为 MetaMask 创建独立的浏览器配置文件
3. TokenPocket 已完全支持，无冲突

## 支持的钱包

- ✅ OKX Wallet - 完全支持，推荐使用
- ✅ TokenPocket - 完全支持
- ⚠️ MetaMask - 支持，但可能与其他钱包冲突

---
*更新时间: 2026-01-10*
