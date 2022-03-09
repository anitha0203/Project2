export class Dates {
    public static differenceInMinutes(date1: Date, date2: Date): number {
        let difference = Math.abs(date1.getTime() - date2.getTime());
        return Math.floor(difference / 1000 / 60);
    }
}