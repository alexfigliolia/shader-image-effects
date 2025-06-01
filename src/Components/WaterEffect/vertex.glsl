varying vec2 vMapUv;

varying vec3 vNormal;
varying vec3 vPosition;

void mainSupport() {
  //vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.);
  //gl_Position = projectionMatrix * modelViewPosition;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  //vNormal = (modelMatrix * vec4(normal, 0.0)).xyz;
  //vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
}