const hre = require("hardhat");

async function main() {
  const BusinessRegistry = await hre.ethers.getContractFactory("BusinessRegistry");
  const registry = await BusinessRegistry.deploy();

  await registry.waitForDeployment(); // ✅ correct for Ethers v6+

  console.log("BusinessRegistry deployed to:", await registry.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
