import axios from "axios";

const fetchUser = async (id, setLoading, setUser, setError) => {
    try{
        console.log("this is user id: ",id);
        setLoading(true);
        console.log('user data loading...');
        const response = await axios.get(`http://localhost:3000/user/${id}`, {withCredentials: true});
        if (response.data && typeof response.data === 'object') {
            setUser(response.data);
            console.log(response.data);
        } else {
            throw new Error("Invalid response data");
        }
    }catch(err){
        setError(err.message || "Failed to fetch user data"); 
    }
    finally{
        setLoading(false);
    }
};

export default fetchUser;

