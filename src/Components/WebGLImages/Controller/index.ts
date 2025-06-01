import throttle from "lodash.throttle";
import { EventEmitter } from "@figliolia/event-emitter";
import { Callback } from "Types/Generics";
import { ImageLoader } from "./ImageLoader";
import { IScrollJacker, ScrollJacker } from "./ScrollJacker";

export class WebGLImagesController {
  private options: IScrollJacker;
  public scroll: ScrollJacker | null = null;
  private emitter = new EventEmitter<WebGLImageStream>();
  constructor(options: IScrollJacker) {
    this.options = options;
  }

  public initialize(onReady: Callback<[IImage[]]>) {
    this.emitter.on("ready", onReady);
    this.scroll = new ScrollJacker(this.options);
    this.scroll.initialize();
    void Promise.all([
      document.fonts.ready,
      new ImageLoader(this.scroll.target).allComplete(),
    ]).then(() => {
      this.cacheImageLocations();
      window.addEventListener("resize", this.throttleImageLocationCache);
    });
  }

  public onScroll(onScroll: Callback<[number]>) {
    return this.emitter.on("scroll", onScroll);
  }

  public offScroll(ID: string) {
    return this.emitter.off("scroll", ID);
  }

  public render() {
    if (this.scroll?.render?.()) {
      this.emitter.emit("scroll", this.scroll.positionToRender);
    }
  }

  public get currentScrollPosition() {
    return this?.scroll?.positionToRender ?? 0;
  }

  public destroy() {
    this.scroll?.destroy();
    this.emitter.storage.clear();
    window.removeEventListener("resize", this.throttleImageLocationCache);
  }

  private cacheImageLocations = () => {
    if (!this.scroll) {
      return;
    }
    const images = this.scroll.target.querySelectorAll("img");
    const imageData: IImage[] = [];
    for (const image of images) {
      const { top, left, width, height } = image.getBoundingClientRect();
      imageData.push({
        top: top + this.scroll.currentPosition,
        left,
        width,
        height,
        image,
      });
    }
    this.emitter.emit("ready", imageData);
    this.emitter.emit("scroll", this.scroll?.positionToRender ?? 0);
  };

  private throttleImageLocationCache = throttle(this.cacheImageLocations, 25);
}

export type IImage = Omit<
  DOMRect,
  "x" | "y" | "bottom" | "right" | "toJSON"
> & { image: HTMLImageElement };

export type { IScrollJacker } from "./ScrollJacker";

export type WebGLImageStream = {
  ready: IImage[];
  scroll: number;
};
