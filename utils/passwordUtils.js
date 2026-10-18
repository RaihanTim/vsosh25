export function checkPasswordStrength(password) {
  return zxcvbn(password);
}

export async function checkPasswordLeak(password) {
  const hash = await sha1(password);
  const prefix = hash.substring(0, 5);
  const suffix = hash.substring(5);

  try {
    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
    const data = await response.text();
    return data.includes(suffix.toUpperCase());
  } catch (error) {
    console.error("HIBP Error:", error);
    return false;
  }
}

async function sha1(str) {
  const buffer = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-1', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}