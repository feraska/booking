import Hotel from "../models/Hotel.js";
//create hotel
export const createHotel = async(req,res,next) => {
    try {
        const newHotel = new Hotel(req.body)
        const savedHotel = await newHotel.save()
        return res.status(200).json(savedHotel)

    } catch (err) {
        next(err)
    }
}
//update hotel
export const updateHotel = async (req, res, next) => {
    try {
      const updatedHotel = await Hotel.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      return res.status(200).json(updatedHotel);
    } catch (err) {
      next(err);
    }
  };
  //delete hotel
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    return res.status(200).json("Hotel has been deleted.");
    } catch (err) {
      next(err);
    }
  }
  //get hotel
  export const getHotel = async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      return res.status(200).json(hotel);
    } catch (err) {
      next(err);
    }
  };
export const getFilterHotels = async(req ,res ,next) => {
  const serach = req.query.search
  try {
    const hotelsList = await Hotel.find({city:{$regex:serach}})
    
    res.status(200).json(hotelsList)
  } catch (err) {
    next(err)
  }
} 
export const getHotels = async (req, res, next) => {
  const { min, max,limit, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min || 1, $lt: max || 999 },
      }).limit(limit);
      res.status(200).json(hotels);
    } catch (err) {
      next(err);
    }
  };