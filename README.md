# Sample Hardhat Project

BusinessRegistry is a decentralized application (DApp) designed to streamline and decentralize the registration and approval process of business ideas. 
It ensures transparency, reduces bureaucracy, and empowers both business owners and authorized reviewers through a blockchain-based solution.

## Features

- Submit new business ideas with details like name, category, region, and description.
- Validate submitted businesses based on allowed regions.
- Admin can:
  - Approve business submissions.
  - Add or remove reviewers.
  - Set allowed or disallowed regions.
- Reviewers can:
  - Reject pending business proposals.
- Emits events for key actions (submission, approval, rejection).
- View full details of any submitted business.

---

## Smart Contract Overview

### Data Structures

- `Business` struct: Contains business metadata including status (`Pending`, `Approved`, `Rejected`).
- `Status` enum: Represents the review state of a business.
- `allowedRegions`: Mapping to control which regions can submit businesses.
- `reviewers`: Mapping to track approved reviewer addresses.
- `businesses`: Mapping to store all submitted businesses.

### Access Control

- `onlyAdmin` modifier: Restricts access to contract owner.
- `onlyReviewer` modifier: Restricts access to approved reviewers.

---

## Functions

### Admin Functions

- `setAllowedRegion(string region, bool allowed)`
  - Enable or disable regions for business submissions.
- `addReviewer(address reviewer)`
  - Grant reviewer permissions to an address.
- `removeReviewer(address reviewer)`
  - Revoke reviewer permissions.

### Submission

- `submitBusiness(string name, string category, string region, string description)`
  - Submit a new business idea for approval. Region must be allowed.

### Approval/Review

- `approveBusiness(uint256 businessId)`
  - Approve a business. Can be called by admin or a reviewer.
- `rejectBusiness(uint256 businessId)`
  - Reject a business. Only reviewers can call this.

### View Functions

- `getBusiness(uint256 businessId)`
  - Returns full details of a business.
- `isReviewer(address user)`
  - Checks if the given address is a reviewer.

---

## Events

- `BusinessSubmitted(uint256 businessId, address owner, string name)`
- `BusinessApproved(uint256 businessId, address reviewer)`
- `BusinessRejected(uint256 businessId, address reviewer)`

---

## Default Allowed Regions

The following regions are initially allowed by default:

- Kigali
- Northern
- Southern
- Western
- Eastern

---

## Deployment

To deploy the contract:

```bash
// Example using Hardhat
npx hardhat compile
npx hardhat run scripts/deploy.js --network localhost


📂 Project Structure
/BusinessRegistry-DApp
│
├── contracts/
│   └── BusinessRegistry.sol
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── ...
│   └── package.json
├── abis/
│   └── BusinessRegistry.json
├── hardhat.config.js
├── README.md
└── .env

📜 License
MIT License

======How to Run Locally===

---Clone this repo.----
-> Run npm install inside /frontend.
---Start local blockchain:---
-> npx hardhat node

-----Deploy contract:---
-> npx hardhat run scripts/deploy.js --network localhost

-----In /frontend, run:-----
-> npm start

---Connect MetaMask to localhost:8545.--
-> Try running some of the following tasks:

```shell````
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```
