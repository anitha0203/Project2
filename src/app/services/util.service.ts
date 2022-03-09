import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private static readonly LOCAL_STORAGE_ZIP_CODES: string = 'ZIP_CODES';

  private zipCodes: string[];

  constructor() {
      this.zipCodes = UtilService.getZipCodesFromStorage();
  }

  private static getZipCodesFromStorage(): string[] {
      return JSON.parse(localStorage.getItem(UtilService.LOCAL_STORAGE_ZIP_CODES)) || [];
  }

  private saveZipCodes(): void {
      localStorage.setItem(UtilService.LOCAL_STORAGE_ZIP_CODES, JSON.stringify(this.zipCodes));
  }

  public addZipCode(zipCode: string): void {
      if (this.zipCodes.includes(zipCode)) {
          return;
      }
      this.zipCodes.push(zipCode);
      this.saveZipCodes();
  }

  public removeZipCode(zipCode: string): void {
      this.zipCodes = this.zipCodes.filter((z: string) => z !== zipCode);
      this.saveZipCodes();
  }

  public getZipCodes(): string[] {
      return this.zipCodes;
  }
}
