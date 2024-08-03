import axios from "axios";
import { SentenceData } from "../../../types/pdfTypes";
const API_URL = "http://localhost:8000/api/pdf-data/";

export const getPdfData = async (): Promise<{ data: SentenceData[] }> => {
  const response = await axios.get(API_URL);
  console.log("hello " + response.data);
  return response.data;
};
