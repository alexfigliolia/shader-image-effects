export class ImageLoader {
  public root: HTMLElement | Document;
  constructor(root: HTMLElement | Document = document) {
    this.root = root;
  }

  public allComplete() {
    const images = this.root.querySelectorAll("img");
    const listeners: (Promise<void> | undefined)[] = [];
    for (const image of images) {
      listeners.push(this.generateListener(image));
    }
    return Promise.allSettled(listeners);
  }

  private generateListener(image: HTMLImageElement) {
    if (image.complete) {
      return;
    }
    const { resolve, reject, promise } = Promise.withResolvers<void>();
    image.onload = () => resolve();
    image.onerror = reject;
    return promise;
  }
}
