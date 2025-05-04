const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BusinessRegistry", function () {
  let BusinessRegistry;
  let registry;
  let admin, reviewer, user;

  beforeEach(async function () {
    [admin, reviewer, user] = await ethers.getSigners();
    const ContractFactory = await ethers.getContractFactory("BusinessRegistry", admin);
    registry = await ContractFactory.deploy();
    await registry.waitForDeployment();
  });

  it("should set the deployer as admin and reviewer", async function () {
    expect(await registry.admin()).to.equal(admin.address);
    expect(await registry.isReviewer(admin.address)).to.equal(true);
  });

  it("should allow admin to add a reviewer", async function () {
    await registry.addReviewer(reviewer.address);
    expect(await registry.isReviewer(reviewer.address)).to.equal(true);
  });

  it("should reject setting an unallowed region", async function () {
    await expect(
      registry.connect(user).submitBusiness("Biz", "Tech", "Unknown", "Test business")
    ).to.be.revertedWith("Region not allowed");
  });

  it("should allow submission of a business in an allowed region", async function () {
    await registry.connect(user).submitBusiness("MyBiz", "Tech", "Kigali", "Blockchain startup");
    const business = await registry.getBusiness(0);
    expect(business[0]).to.equal("MyBiz");
    expect(business[5]).to.equal(0); // Status.Pending
  });

  it("should allow admin to approve a submitted business", async function () {
    await registry.connect(user).submitBusiness("MyBiz", "Tech", "Kigali", "Blockchain startup");
    await registry.approveBusiness(0);
    const business = await registry.getBusiness(0);
    expect(business[5]).to.equal(1); // Status.Approved
  });

  it("should allow reviewer to reject a submitted business", async function () {
    await registry.addReviewer(reviewer.address);
    await registry.connect(user).submitBusiness("MyBiz", "Tech", "Kigali", "Blockchain startup");
    await registry.connect(reviewer).rejectBusiness(0);
    const business = await registry.getBusiness(0);
    expect(business[5]).to.equal(2); // Status.Rejected
  });

  it("should prevent non-reviewers from rejecting", async function () {
    await registry.connect(user).submitBusiness("MyBiz", "Tech", "Kigali", "Blockchain startup");
    await expect(
      registry.connect(user).rejectBusiness(0)
    ).to.be.revertedWith("Only reviewers");
  });

  it("should prevent non-admins from approving", async function () {
    await registry.connect(user).submitBusiness("MyBiz", "Tech", "Kigali", "Blockchain startup");
    await expect(
      registry.connect(user).approveBusiness(0)
    ).to.be.revertedWith("Only admin");
  });
});
