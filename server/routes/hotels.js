import { createHotel, deleteHotel, getHotel, updateHotel, getHotels, getFilterHotels } from "../controllers/hotel.js"
import express from "express"
import {verifyAdmin} from "../utils/verifyToken.js"
import { countByCity, countByType, getHotelRooms } from "../controllers/room.js"

const router = express.Router()
//create
router.post("/",verifyAdmin, createHotel)
//update
router.put("/:id", verifyAdmin, updateHotel)
//delete
router.delete("/:id", verifyAdmin, deleteHotel)
//get
router.get("/find/:id", getHotel)
//GET ALL
router.get("/", getHotels);
router.get("/filter",getFilterHotels)
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);
export default router