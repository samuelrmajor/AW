import axios from "axios";
import { supabase } from "./supabaseClient";


const getPerpsFiltered = async (myname) => {
  const { data, error, status } = await supabase.rpc("filter_search_bar", {
    myname
  })
  if (error) return 'Error - Filter Search failed'
  return data
};
//test

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
  const { data, error, status } = await supabase.rpc("get_random_perp");
  if (error) return "Error - Random Perp Search failed";
  return data;
};



const votePerp = async (mywebid, myvote) => {
  const { data, error, status } = await supabase.rpc("add_status_vote", {
    myvote,
    mywebid
  });
  if (error) return "Error - Vote failed";
  return data;
};

export default { getPerpsFiltered, getSpecificPerp, getRandomPerp, votePerp};

