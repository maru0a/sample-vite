import { supabase } from "./supabase";

export const getAllRecords = async () => {
  const records = await supabase.from("study-record").select("*");
  return records;
}

export const addRecord = async (title, time) => {
  const { data, error } = await supabase
    .from("study-record")
    .insert([
      {title: title, time:time}
    ]);
  if (error) {
    throw error;
  }
  return data;
}

export const deleteRecord = async (id) => {
  const record = await supabase
    .from("study-record")
    .delete()
    .eq('id', id);

  return record;
}