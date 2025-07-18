import { useAuthStore } from "@/stores/useAuthStore";
import { checkSession } from "../api/auth/siwe";

export async function checkAndSetSession() {
  const session = await checkSession();

  if (session) {
    useAuthStore.getState().setSession(session);
  } else {
    useAuthStore.getState().reset();
  }
  return session;
}
