import { Address } from "viem";

export function isHexString(value: any, length?: number): boolean {
  if (typeof value !== "string" || !/^0x[0-9A-Fa-f]*$/.test(value)) {
    return false;
  }

  if (length && value.length !== 2 + 2 * length) {
    return false;
  }

  return true;
}

export function isAddress(value: any): value is Address {
  return isHexString(value) && /^0x[0-9a-f]{40}$/.test(value);
}

export function toAddress(value: string): Address {
  const address = value.toLowerCase();

  if (isAddress(address)) {
    return address;
  }

  throw new Error("Invalid address");
}
