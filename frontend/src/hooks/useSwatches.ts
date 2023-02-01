import axios from "axios";
import { useEffect, useState } from "react";
import { Colors } from "../types";

const useSwatches = (initLimit: number) => {
   const [limit, setLimit] = useState<number>(initLimit);
   const [swatches, setSwatches] = useState<Colors[]>([]);

   const fetchSwatches = async () => {
      const { data } = await axios.get("/api/v1/color", { params: { limit } });
      setSwatches(data)
   }

   useEffect(() => {
      fetchSwatches();

      // eslint-disable-next-line
   }, []);

   return { swatches, limit, setLimit, fetchSwatches }
}

export default useSwatches;