const express = require('express');
const router = express.Router();
const roomController = require('../controllers/room.controller');
const path = require('path');
const upload = require('../middleware/upload');

router.get('/', roomController.getAllRooms);
router.get('/:id', roomController.getRoomById); // 👈 thêm dòng này


// Thêm CRUD 
router.put('/:id', roomController.updateRoom);
router.delete('/:id', roomController.deleteRoom);


// thêm middleware upload
router.post('/', upload.single('image'), roomController.createRoom);

router.put(    // khai báo ảnh 
  "/:id/image",
  upload.single("image"),
  roomController.updateRoomImage
);


module.exports = router;
