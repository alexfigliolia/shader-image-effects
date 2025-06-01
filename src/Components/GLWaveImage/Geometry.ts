import gsap from "gsap";
import { Mesh, Vector2 } from "three";
import { ThreeEvent } from "@react-three/fiber";

export class Geometry {
  public static pointerPosition(e: ThreeEvent<PointerEvent>) {
    return e.uv || e.pointer;
  }

  public static pointerEventFromCenter(e: ThreeEvent<PointerEvent>) {
    const position = this.pointerPosition(e);
    return {
      position,
      x: Geometry.pointerFromCenter(position.x),
      y: Geometry.pointerFromCenter(position.y),
    };
  }

  public static pointerFromCenter(uv: number) {
    return uv <= 0.5 ? 0.5 - uv : -(uv - 0.5);
  }

  public static transitionUniforms(transitions: [{ value: number }, number][]) {
    for (const [property, value] of transitions) {
      gsap.to(property, {
        duration: 1,
        value,
      });
    }
  }

  public static transitionVector2(
    uniform: Vector2,
    value: Vector2,
    duration = 0.5,
  ) {
    gsap.to(uniform, {
      ...value,
      duration,
    });
  }

  public static rotateMesh(mesh: Mesh, x: number, y: number) {
    gsap.to(mesh.rotation, {
      duration: 1,
      y: x,
      x: y,
    });
  }
}
