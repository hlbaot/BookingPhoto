import axios from "axios";
import { Package } from "../interfaces/package";

export const API_Service = async (): Promise<Package[]> => {
  const res = await axios.get<Package[]>(
    "https://bookingphoto.onrender.com/packages"
  );
  return res.data;
};
