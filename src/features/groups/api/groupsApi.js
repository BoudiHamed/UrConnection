import { supabase } from "../../../lib/supabase";

export const getGroups = async () => {
  const { data, error } = await supabase.from("groups").select("*"); // جلب كل شيء بدون ترتيب حالياً

  if (error) {
    console.error("Supabase Error Details:", error); // هذا سيطبع لنا تفاصيل الخطأ بدقة
    throw new Error(error.message);
  }
  return data;
};

export const createGroup = async (newGroup) => {
  const { data, error } = await supabase
    .from("groups")
    .insert([newGroup]) // Supabase expects an array
    .select();

  if (error) throw new Error(error.message);
  return data;
};

export const deleteGroup = async (id) => {
  const { error } = await supabase.from("groups").delete().eq("id", id); // Match the ID of the group

  if (error) throw new Error(`coudn't delete the group` || error.message);
};
