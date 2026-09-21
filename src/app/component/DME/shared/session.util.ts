export function resolveLoginUserId(): number {
  const login = JSON.parse(localStorage.getItem('loginData') || '{}');
  return Number(login.user_id ?? login.userId ?? login.DistId ?? 0);
}

export function resolveLoginAuthorityId(): string {
  const login = JSON.parse(localStorage.getItem('loginData') || '{}');
  return String(login.ConID ?? login.conID ?? login.conId ?? '').trim();
}

export function apiErrorMessage(
  err: { error?: { userError?: string; developerError?: string; message?: string; detail?: string; error?: string } },
  fallback: string,
): string {
  const devError = err?.error?.developerError?.trim() || err?.error?.detail?.trim() || (typeof err?.error?.error === 'string' ? err?.error?.error?.trim() : '');
  const userError = err?.error?.userError?.trim() || err?.error?.message?.trim();

  if (devError) {
    console.error('[Developer Error]:', devError);
  }

  return userError || fallback;
}
