export interface bcryptInterface {
  crypt(value: string): string;
  compare(value: string, hash: string): boolean;
}
