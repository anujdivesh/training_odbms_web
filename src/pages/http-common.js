import axios from "axios";

export default axios.create({
  baseURL: "https://opmdata.gem.spc.int",
  headers: {
    "Content-type": "application/json",
  },
});
