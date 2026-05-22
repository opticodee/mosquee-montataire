"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  checkPassword,
  createSession,
  destroySession,
  isAuthenticated,
} from "@/lib/admin-auth";
import { setJumuaStream, setNewsItem } from "@/lib/supabase";

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (await checkPassword(password)) {
    await createSession();
    redirect("/admin");
  }
  redirect("/admin/login?error=1");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}

export async function saveJumuaAction(formData: FormData) {
  if (!(await isAuthenticated())) redirect("/admin/login");
  await setJumuaStream({
    enabled: formData.get("enabled") === "on",
    token: String(formData.get("token") ?? "").trim(),
    date: String(formData.get("date") ?? "").trim(),
  });
  revalidatePath("/traduction-en-direct/jumua");
  revalidatePath("/traduction-en-direct");
  revalidatePath("/admin");
  redirect("/admin?saved=1");
}

export async function saveNewsAction(formData: FormData) {
  if (!(await isAuthenticated())) redirect("/admin/login");
  const slot = Number(formData.get("slot"));
  if (![1, 2, 3].includes(slot)) return;
  await setNewsItem({
    slot,
    enabled: formData.get("enabled") === "on",
    title: String(formData.get("title") ?? "").trim(),
    html: String(formData.get("html") ?? "").trim(),
  });
  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin?saved=news" + slot);
}
