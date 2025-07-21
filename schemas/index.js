import * as z from "zod";

const cleanAndRound = val => {
  if (typeof val === "string") {
    // Remove any non-digit, non-dot, non-minus characters (e.g., "mg", "g", "kcal")
    const cleaned = val.replace(/[^\d.-]/g, "");
    const num = parseFloat(cleaned);
    if (isNaN(num)) return undefined;
    return Math.round(num);
  }
  if (typeof val === "number") {
    return Math.round(val);
  }
  return undefined;
};

export const SignupSchema = z.object({
  name: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Confirm password must be at least 8 characters"),
});

export const SignInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const ResetSchema = z.object({
  email: z.string().email("Invalid email address"),
 
});

export const NewPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
 
});


export const NewRecipeSchema = z.object({
  title: z.string().min(1, "Title is required"),
  image: z.string().url("Invalid image URL"),
  description: z.string().min(1, "Description is required"),
  ingredients: z
    .array(z.string().min(1, "Ingredient cannot be empty"))
    .min(1, "At least one ingredient is required"),
  instructions:z.array(z.string().min(1, "Ingredient cannot be empty"))
    .min(1, "At least one ingredient is required"),
  servings: z.string().min(1, "Servings are required"),
  cookingTimeHours: z.string().min(1, "Cooking time is required"),
  cookingTimeMinutes: z.string().min(1, "Cooking time is required"),
  PrepTimeHours: z.string().min(1, "Prep time is required"),
  PrepTimeMinutes: z.string().min(1, "Prep time is required"),
  cuisine: z.string().min(1, "Cuisine is required"),
 
   calories: z.preprocess(cleanAndRound, z.number().min(0).optional()),
  protein: z.preprocess(cleanAndRound, z.number().min(0).optional()),
  fats: z.preprocess(cleanAndRound, z.number().min(0).optional()),
  carbohydrates: z.preprocess(cleanAndRound, z.number().min(0).optional()),
  fiber: z.preprocess(cleanAndRound, z.number().min(0).optional()),
  netCarbs: z.preprocess(cleanAndRound, z.number().min(0).optional()),
  sodium: z.preprocess(cleanAndRound, z.number().min(0).optional()),
  cholesterol: z.preprocess(cleanAndRound, z.number().min(0).optional()),});
  
export const ProfileSchema = z.object({
  name: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  experience: z.string().min(1, "Experience is required"),
 
});