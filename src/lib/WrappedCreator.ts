import Wrapped from "./Wrapped";
import JSZip from "jszip";
import { HingeData, HingeDataSchema } from "./types";

export default class WrappedCreator {
  public async fromZip(file: File): Promise<Wrapped> {
    try {
      const zip = new JSZip();
      await zip.loadAsync(file);

      const userData: HingeData = {
        matches: await this.loadFile(zip, "matches.json"),
        media: await this.loadFile(zip, "media.json"),
        prompts: await this.loadFile(zip, "prompts.json"),
        user: await this.loadFile(zip, "user.json", {}),
      };

      this.investigateSchema(userData);
      return new Wrapped(userData);
    } catch (e) {
      console.error(e);

      throw new Error("Failed to load ZIP file");
    }
  }

  private async loadFile(
    zip: JSZip,
    fileName: string,
    defaultValue: any = []
  ): Promise<any> {
    const file = zip.files[fileName];
    if (!file) {
      console.error(`File ${fileName} not found in ZIP`);
      return defaultValue;
    }

    const content = await file.async("string");
    return JSON.parse(content as string);
  }

  forDemoMode(): Wrapped {
    const wrapped = new Wrapped({} as any);
    wrapped.demoMode = true;
    return wrapped;
  }

  private investigateSchema(content: any) {
    const parsed = HingeDataSchema.safeParse(content);
    if (!parsed.success) {
      console.error("Incorrect Schema", parsed.error.errors);
    }
  }
}
