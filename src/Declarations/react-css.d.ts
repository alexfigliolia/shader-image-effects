import "react";

declare module "react" {
  export interface CSSProperties {
    "--height"?: string;
  }
}
