export class Keg {
    public kegVol: number = 124;
    public sale: boolean = false;
    constructor (public name?: string, public brand?: string, public price?: number, public alcohol?: number) {}
}