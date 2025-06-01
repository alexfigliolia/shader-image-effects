uniform sampler2D uDiffuse;
uniform float uTime;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec2 newUv = uv;
  float area = pow(smoothstep(0.4, 0., uv.y), 4.);

  float offsetX = (newUv.x * 0.25) * 0.25 * area;
  float offsetY = ((newUv.y * 0.25) * 0.25 * pow(area, 4.));
  
  newUv.x += offsetX;
  newUv.y -= offsetY;

  vec4 rgba = texture2D(inputBuffer, newUv);
  outputColor = rgba;
}