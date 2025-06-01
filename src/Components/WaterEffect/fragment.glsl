uniform sampler2D uDiffuse;
// varying vec2 vMapUv;

uniform float uTime;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  //vec2 vUv = uv.xy;
  float factor = 3.0; // <-1.5
  vec2 uv1 = uv;
  float frequency = 6.0;
  float amplitude = 0.015 * factor;
  float x = uv1.y * frequency + uTime * .7;
  float y = uv1.x * frequency + uTime * .3;
  uv1.x += cos(x+y) * amplitude * cos(y);
  uv1.y += sin(x-y) * amplitude * cos(y);
  // https://github.com/aguilarmiqueas/car-game/blob/62872b759b9a28c75860347db311561b9a790bce/src/CustomPass.js
  // secrect sauce: inputBuffer.....man this took me hours to find
  vec4 rgba = texture2D(inputBuffer, uv1);
  outputColor= rgba;
}