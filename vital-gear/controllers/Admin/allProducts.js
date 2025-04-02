import axios from "axios";

const allProducts = async(req,res) => {
    try{
        const response = await axios.get("http://localhost:3000/products");
    }
    catch(err){
        
    }
}