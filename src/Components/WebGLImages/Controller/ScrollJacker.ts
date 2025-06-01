import { MathUtils } from "three";

export class ScrollJacker {
  public speed = 0;
  private ease = 0.1;
  public active = false;
  public targetSpeed = 0;
  public main: HTMLElement;
  public target: HTMLElement;
  public currentPosition = 0;
  public positionToRender = 0;
  private styleCache = new Map<string, string>();
  private static readonly cachedStyleProperties = [
    "top",
    "left",
    "position",
    "overflow",
  ] as const;
  constructor({ target, parent, lerpBy = 0.1 }: IScrollJacker) {
    this.ease = lerpBy;
    this.main = this.extractDOMtarget(parent);
    this.target = this.extractDOMtarget(target);
  }

  public initialize() {
    if (!this.active) {
      this.active = true;
      this.onResize();
      this.positionElements();
      window.addEventListener("resize", this.onResize);
      window.addEventListener("scroll", this.onScroll);
    }
  }

  public destroy() {
    if (this.active) {
      this.active = false;
      this.resetElementPositions();
      window.removeEventListener("resize", this.onResize);
      window.removeEventListener("scroll", this.onScroll);
    }
  }

  public render() {
    this.speed =
      Math.min(Math.abs(this.currentPosition - this.positionToRender), 200) /
      200;
    this.targetSpeed += (this.speed - this.targetSpeed) * 0.2;
    this.positionToRender = MathUtils.lerp(
      this.positionToRender,
      this.currentPosition,
      this.ease,
    );
    return this.translate();
  }

  private translate(force = false) {
    if (
      Math.round(this.positionToRender) !== Math.round(this.currentPosition) ||
      this.positionToRender < 10 ||
      force
    ) {
      this.target.style.transform = `translate3d(0, ${-this.positionToRender}px, 0)`;
      return true;
    }
  }

  private positionElements() {
    const computed = window.getComputedStyle(this.main);
    for (const property of ScrollJacker.cachedStyleProperties) {
      this.styleCache.set(property, computed[property]);
    }
    if (this.main.style.height) {
      this.styleCache.set("height", this.main.style.height);
    }
    this.main.style.position = "fixed";
    this.main.style.height = "100%";
    this.main.style.top = "0px";
    this.main.style.left = "0px";
    this.main.style.overflow = "hidden";
    this.onScroll();
    this.positionToRender = this.currentPosition;
    this.translate(true);
  }

  private resetElementPositions() {
    for (const property of ScrollJacker.cachedStyleProperties) {
      const value = this.styleCache.get(property)!;
      this.main.style[property] = value;
    }
    if (this.styleCache.has("height")) {
      this.main.style.height = this.styleCache.get("height")!;
    } else {
      this.main.style.height = "auto";
    }
  }

  private onResize = () => {
    this.onScroll();
    document.body.style.height = `${this.target.scrollHeight}px`;
  };

  private onScroll = () => {
    this.currentPosition = document.documentElement.scrollTop;
  };

  private extractDOMtarget(target: HTMLElement | string, main = false) {
    if (typeof target === "string") {
      const element = document.querySelector(target);
      if (!element) {
        throw new Error(
          main
            ? "Your main element was not found. Please add one to your page. Your target element should resize inside it"
            : "Your target element was not found. Please try again",
        );
      }
      return element as HTMLElement;
    }
    return target;
  }
}

export interface IScrollJacker {
  lerpBy?: number;
  target: HTMLElement | string;
  parent: HTMLElement | string;
}
