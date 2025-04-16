import axios from "axios";

const allAddresses = async (setAddresses, setLoading, setError) => {
    try{
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/address`, {withCredentials: true});
        console.log('HG response', response);
        const fetchedAddresses = Array.isArray(response.data)
         ? response.data
         : response.data.data || [];
        setAddresses(fetchedAddresses);
        console.log('HG addresses: ',fetchedAddresses);
    } catch(err){
        setError(err.message || 'Failed to fetch address');
    } finally{
        setLoading(false);
    }
};

export default allAddresses;
