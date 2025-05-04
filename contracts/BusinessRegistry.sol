// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract BusinessRegistry {
    address public admin;

    enum Status { Pending, Approved, Rejected }

    struct Business {
        string name;
        string category;
        string region;
        string description;
        address owner;
        Status status;
    }

    uint256 public businessCount;
    mapping(uint256 => Business) public businesses;
    mapping(string => bool) public allowedRegions;
    mapping(address => bool) public reviewers;

    event BusinessSubmitted(uint256 indexed businessId, address indexed owner, string name);
    event BusinessApproved(uint256 indexed businessId, address indexed reviewer);
    event BusinessRejected(uint256 indexed businessId, address indexed reviewer);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin");
        _;
    }

    modifier onlyReviewer() {
        require(reviewers[msg.sender], "Only reviewers");
        _;
    }

    constructor() {
        admin = msg.sender;
        reviewers[msg.sender] = true;

        // Default allowed regions
        allowedRegions["Kigali"] = true;
        allowedRegions["Northern"] = true;
        allowedRegions["Southern"] = true;
        allowedRegions["Western"] = true;
        allowedRegions["Eastern"] = true;
    }

    // Admin can allow or disallow a region
    function setAllowedRegion(string memory region, bool allowed) external onlyAdmin {
        allowedRegions[region] = allowed;
    }

    // Admin can add a reviewer
    function addReviewer(address reviewer) external onlyAdmin {
        reviewers[reviewer] = true;
    }

    // Admin can remove a reviewer
    function removeReviewer(address reviewer) external onlyAdmin {
        reviewers[reviewer] = false;
    }

    // Submit a new business
    function submitBusiness(
        string memory name,
        string memory category,
        string memory region,
        string memory description
    ) external {
        require(allowedRegions[region], "Region not allowed");

        businesses[businessCount] = Business({
            name: name,
            category: category,
            region: region,
            description: description,
            owner: msg.sender,
            status: Status.Pending
        });

        emit BusinessSubmitted(businessCount, msg.sender, name);
        businessCount++;
    }

    // Allow both admin and reviewers to approve
    function approveBusiness(uint256 businessId) external {
        require(msg.sender == admin || reviewers[msg.sender], "Not authorized to approve");
        require(businessId < businessCount, "Business does not exist");

        Business storage b = businesses[businessId];
        require(b.status == Status.Pending, "Already processed");

        b.status = Status.Approved;
        emit BusinessApproved(businessId, msg.sender);
    }

    // Only reviewers can reject
    function rejectBusiness(uint256 businessId) external onlyReviewer {
        require(businessId < businessCount, "Business does not exist");

        Business storage b = businesses[businessId];
        require(b.status == Status.Pending, "Already processed");

        b.status = Status.Rejected;
        emit BusinessRejected(businessId, msg.sender);
    }

    // View business details
    function getBusiness(uint256 businessId) external view returns (
        string memory, string memory, string memory, string memory, address, Status
    ) {
        require(businessId < businessCount, "Business does not exist");
        Business memory b = businesses[businessId];
        return (
            b.name,
            b.category,
            b.region,
            b.description,
            b.owner,
            b.status
        );
    }

    // Check if address is a reviewer
    function isReviewer(address user) external view returns (bool) {
        return reviewers[user];
    }
}






// pragma solidity ^0.8.28;

// contract BusinessRegistry {
//     address public admin;

//     enum Status { Pending, Approved, Rejected }

//     struct Business {
//         string name;
//         string category;
//         string region;
//         string description;
//         address owner;
//         Status status;
//     }

//     uint256 public businessCount;
//     mapping(uint256 => Business) public businesses;
//     mapping(string => bool) public allowedRegions;
//     mapping(address => bool) public reviewers;

//     event BusinessSubmitted(uint256 indexed businessId, address indexed owner, string name);
//     event BusinessApproved(uint256 indexed businessId, address indexed reviewer);
//     event BusinessRejected(uint256 indexed businessId, address indexed reviewer);

//     modifier onlyAdmin() {
//         require(msg.sender == admin, "Only admin");
//         _;
//     }

//     modifier onlyReviewer() {
//         require(reviewers[msg.sender], "Only reviewers");
//         _;
//     }

//     // Constructor to initialize the contract state
//     constructor() {
//         admin = msg.sender;
//         reviewers[msg.sender] = true;

//         // Add default allowed regions (can be changed by admin later)
//         allowedRegions["Kigali"] = true;
//         allowedRegions["Northern"] = true;
//         allowedRegions["Southern"] = true;
//         allowedRegions["Western"] = true;
//         allowedRegions["Eastern"] = true;
//     }

//     // Add or remove regions dynamically by the admin
//     function setAllowedRegion(string memory region, bool allowed) external onlyAdmin {
//         allowedRegions[region] = allowed;
//     }

//     // Add a new reviewer
//     function addReviewer(address reviewer) external onlyAdmin {
//         reviewers[reviewer] = true;
//     }

//     // Remove a reviewer
//     function removeReviewer(address reviewer) external onlyAdmin {
//         reviewers[reviewer] = false;
//     }

//     // Submit a business
//     function submitBusiness(
//         string memory name,
//         string memory category,
//         string memory region,
//         string memory description
//     ) external {
//         require(allowedRegions[region], "Region not allowed");

//         businesses[businessCount] = Business({
//             name: name,
//             category: category,
//             region: region,
//             description: description,
//             owner: msg.sender,
//             status: Status.Pending
//         });

//         emit BusinessSubmitted(businessCount, msg.sender, name);
//         businessCount++;
//     }

//     // Approve a business (only the admin can approve)
//     function approveBusiness(uint256 businessId) external onlyAdmin {
//         require(businessId < businessCount, "Business does not exist");
//         Business storage b = businesses[businessId];
//         require(b.status == Status.Pending, "Already processed");

//         b.status = Status.Approved;
//         emit BusinessApproved(businessId, msg.sender);
//     }

//     // Reject a business (only reviewers can reject)
//     function rejectBusiness(uint256 businessId) external onlyReviewer {
//         require(businessId < businessCount, "Business does not exist");
//         Business storage b = businesses[businessId];
//         require(b.status == Status.Pending, "Already processed");

//         b.status = Status.Rejected;
//         emit BusinessRejected(businessId, msg.sender);
//     }

//     // Get business details
//     function getBusiness(uint256 businessId) external view returns (
//         string memory, string memory, string memory, string memory, address, Status
//     ) {
//         require(businessId < businessCount, "Business does not exist");
//         Business memory b = businesses[businessId];
//         return (
//             b.name,
//             b.category,
//             b.region,
//             b.description,
//             b.owner,
//             b.status
//         );
//     }

//     // Check if an address is a reviewer
//     function isReviewer(address user) external view returns (bool) {
//         return reviewers[user];
//     }
// }