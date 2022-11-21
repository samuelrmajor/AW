import axios from "axios";
import { supabase } from "./supabaseClient";


const getPerpsFiltered = async (myname) => {
  const { data, error, status } = await supabase.rpc("filter_search_bar", {
    myname
  })
  if (error) return 'Error - Filter Search failed'
  return data
};


const getSpecificPerp = async (mywebid) => {
  const { data, error, status } = await supabase.rpc("get_specific_perp", {
    mywebid
  })
  const { data2, error2, status2 } = await supabase.rpc("increment_perp_view", {
    mywebid,
  });
  if (error2) return 'invalid incriemnt'
  if (error) return "Error - Perp Search failed";
  return data;


}



const getRandomPerp = async () => {
  const { data, error, status } = await supabase.rpc("random_perp_test2");
  if (error) return "Error - Random Perp Search failed";
  return data;
};

export default { getPerpsFiltered, getSpecificPerp, getRandomPerp };

