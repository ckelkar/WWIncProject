export class InputParams {
  public limit: number;
  public offset: number;
  public location: number;
  public cuisine: string;
  public category: string;
  public sort: string;
  constructor() {
    this.offset = 0;
    this.limit = 40;
  }


}
