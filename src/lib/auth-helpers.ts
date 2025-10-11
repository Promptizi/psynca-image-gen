import { supabase } from "@/integrations/supabase/client";

export const getUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("studio_user_profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    return null;
  }
};

export const getUserCredits = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("studio_user_credits")
      .select("credits")
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Error fetching user credits:", error);
      return 0;
    }

    return data?.credits || 0;
  } catch (error) {
    console.error("Error in getUserCredits:", error);
    return 0;
  }
};

export const createUserProfile = async (userId: string, email: string, fullName?: string) => {
  console.log("createUserProfile called with:", { userId, email, fullName });
  try {
    const profileData = {
      user_id: userId,
      email,
      full_name: fullName || email.split("@")[0],
      role: "user",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    console.log("Inserting profile data:", profileData);

    const { error: profileError } = await supabase
      .from("studio_user_profiles")
      .insert(profileData);

    if (profileError) {
      console.error("Error creating user profile:", profileError);
      throw profileError;
    }
    console.log("Profile inserted successfully");

    const creditsData = {
      user_id: userId,
      credits: 2, // Initial free credits
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    console.log("Inserting credits data:", creditsData);

    const { error: creditsError } = await supabase
      .from("studio_user_credits")
      .insert(creditsData);

    if (creditsError) {
      console.error("Error creating user credits:", creditsError);
      throw creditsError;
    }
    console.log("Credits inserted successfully");

    return true;
  } catch (error) {
    console.error("Error in createUserProfile:", error);
    throw error;
  }
};

export const updateUserCredits = async (userId: string, credits: number) => {
  try {
    const { error } = await supabase
      .from("studio_user_credits")
      .update({
        credits,
        updated_at: new Date().toISOString()
      })
      .eq("user_id", userId);

    if (error) {
      console.error("Error updating user credits:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error in updateUserCredits:", error);
    return false;
  }
};

export const consumeCredits = async (userId: string, amount: number = 1) => {
  try {
    const currentCredits = await getUserCredits(userId);

    if (currentCredits < amount) {
      throw new Error("Insufficient credits");
    }

    const newCredits = currentCredits - amount;
    const success = await updateUserCredits(userId, newCredits);

    if (!success) {
      throw new Error("Failed to update credits");
    }

    return { success: true, remainingCredits: newCredits };
  } catch (error: any) {
    console.error("Error in consumeCredits:", error);
    return { success: false, error: error.message };
  }
};

export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isStrongPassword = (password: string) => {
  return password.length >= 8 &&
         /[A-Z]/.test(password) &&
         /[a-z]/.test(password) &&
         /[0-9]/.test(password);
};

export const getPasswordStrength = (password: string) => {
  if (!password) return 0;

  let strength = 0;

  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;

  return Math.min(Math.floor((strength / 6) * 100), 100);
};

export const formatDate = (date: string | Date) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(dateObj);
};

export const getInitials = (name: string) => {
  const parts = name.trim().split(" ");
  if (parts.length === 0) return "U";

  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};