import axios from "axios";

export async function httpGet<T>(url: string): Promise<T> {
  try {
    return (await axios.get(url)).data;
  } catch (error) {
    // TODO log error
    return null;
  }
}
