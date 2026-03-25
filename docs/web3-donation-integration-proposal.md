# Web3 Donation Integration Proposal

## Awomi Umthombho Feeding Scheme

**Date:** 22 March 2026  
**Status:** Pending Client Approval  
**Prepared by:** Development Team

---

## 1. Executive Summary

This document proposes integrating cryptocurrency donation capabilities into the Awomi Umthombho website, allowing donors to contribute using Solana (SOL) or Ethereum (ETH). This would expand payment options beyond traditional methods.

---

## 2. Background

**Current State:**
- Static single-page application (SPA)
- Built with vanilla HTML/CSS/JavaScript
- Existing donation via email/mailto form
- No online payment processing

**Proposed Enhancement:**
- Add cryptocurrency wallet integration
- Enable direct crypto donations to organization wallet

---

## 3. Recommended Blockchain: Solana

### Why Solana Over Ethereum?

| Factor | Solana | Ethereum |
|--------|--------|----------|
| Transaction Fees | $0.001 - $0.01 | $5.00 - $50.00 |
| Transaction Speed | ~400ms | 12-15 seconds |
| Minimum Viable Donation | $0.50 | $10.00+ |

### Benefits
- Lower barriers for small donors
- More donations reach the cause (less lost to fees)
- Growing African adoption
- Faster confirmation times

### Considerations
- Donors need Solana-compatible wallet (Phantom, Solflare)
- MetaMask doesn't support Solana natively
- Smaller (but growing) user base vs Ethereum

---

## 4. Proposed Implementation

### Option A: Simple Wallet Display (Recommended)
**Cost:** Development only | **Complexity:** Low

Display organization Solana wallet address with:
- Copy-to-clipboard button
- QR code for mobile wallet scanning
- Explanation text for donors unfamiliar with crypto

**Advantages:** No smart contract, no ongoing costs, immediate setup

---

### Option B: Wallet Connection (Medium Complexity)
**Cost:** Development only | **Complexity:** Medium

Add "Connect Wallet" button allowing donors to:
- Connect via Phantom/Solflare wallet
- See connected wallet address
- Send donations directly through site

---

### Option C: Full Integration (Not Recommended)
**Cost:** Development + Smart Contract | **Complexity:** High

On-chain donation tracking, automated receipts, etc.

**Verdict:** Overkill for current needs. High complexity, marginal benefit.

---

## 5. Implementation Scope

### Pages to Update
1. **Mission Page** (`/mission`) - Primary donation location
2. **Contact Page** (`/contact`) - Secondary location

### UI Components
- "Donate with Crypto" section
- Wallet address display with copy button
- QR code for easy mobile scanning
- Brief explanation for non-crypto users

### Technical Requirements
- Ethers.js (Ethereum) OR @solana/wallet-adapter (Solana)
- QR code library (e.g., qrcode.js)
- No smart contract deployment needed (Option A)

---

## 6. What We Need From Client

To proceed, please provide:

1. **Solana Wallet Address** - The address where donations will be received
2. **Approval** - Confirm Option A (Simple Wallet Display) is acceptable
3. **Optional:** If you'd like Ethereum option too, provide ETH address

---

## 7. Timeline Estimate

| Task | Duration |
|------|----------|
| Design mockup | 1 day |
| Development | 1-2 days |
| Testing | 0.5 day |
| **Total** | **2.5 - 3.5 days** |

---

## 8. Questions for Client

- [ ] Do you have a Solana wallet address we can use?
- [ ] Is Option A (simple address display) acceptable?
- [ ] Would you also like to accept Ethereum donations?
- [ ] Any design preferences for the donation section?

---

## 9. Next Steps

1. Client reviews this document
2. Client provides wallet address
3. Development team implements
4. Testing and deployment
5. Launch

---

**Please confirm approval to proceed or provide feedback/questions.**
