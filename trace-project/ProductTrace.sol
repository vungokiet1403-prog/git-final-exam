// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProductTrace {
    struct Product {
        string name;
        string origin;
        string harvestDate;
        string status;
        address owner;
    }

    mapping(string => Product) public products;

    // Đăng sản phẩm mới
    function registerProduct(
        string memory id,
        string memory name,
        string memory origin,
        string memory harvestDate
    ) public {
        products[id] = Product(
            name,
            origin,
            harvestDate,
            "Đã tạo",
            msg.sender
        );
    }

    // Cập nhật trạng thái sản phẩm
    function updateStatus(string memory id, string memory newStatus) public {
        require(products[id].owner == msg.sender, "Khong co quyen cap nhat!");
        products[id].status = newStatus;
    }

    // Lấy thông tin sản phẩm
    function getProduct(string memory id)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            address
        )
    {
        Product memory p = products[id];
        return (p.name, p.origin, p.harvestDate, p.status, p.owner);
    }
}
