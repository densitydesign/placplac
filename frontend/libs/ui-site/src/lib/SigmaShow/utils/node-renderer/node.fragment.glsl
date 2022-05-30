precision mediump float;

varying vec4 v_color;
varying vec4 v_dotColor;
varying vec4 v_insideColor;
varying vec2 v_diffVector;
varying float v_radius;
varying float v_border;

const vec4 transparent = vec4(0.0, 0.0, 0.0, 0.0);

void main(void) {
  float halfRadius = 0.75 * v_radius;
  float distToCenter = length(v_diffVector);

  if (distToCenter > v_radius + v_border) {
    gl_FragColor = transparent;
  } else if (distToCenter > v_radius) {
    gl_FragColor = mix(v_color, transparent, (distToCenter - v_radius) / v_border);
  } else if (distToCenter > halfRadius + v_border) {
    gl_FragColor = v_color;
  } else if (distToCenter > halfRadius) {
    gl_FragColor = mix(v_insideColor, v_color, (distToCenter - halfRadius) / v_border);
  } else {
    gl_FragColor = v_insideColor;
  }
}
