import axios from "axios";

const main = async () => {
  try {
    
    const response = await axios.get("https://www.googleapis.com/books/v1/volumes");
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};

main();

