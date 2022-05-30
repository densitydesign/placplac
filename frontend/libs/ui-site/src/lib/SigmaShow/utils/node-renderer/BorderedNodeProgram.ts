import {
  AbstractProgram,
  RenderParams,
} from 'sigma/rendering/webgl/programs/common/program';
import { NodeDisplayData } from 'sigma/types';
import { floatColor } from 'sigma/utils';

import vertexShaderSource from './node.vertex.glsl';
import fragmentShaderSource from './node.fragment.glsl';

const POINTS = 3;
const ATTRIBUTES = 6;

const ANGLE_1 = 0,
  ANGLE_2 = (2 * Math.PI) / 3,
  ANGLE_3 = (4 * Math.PI) / 3;

export default class BorderedNodeProgram extends AbstractProgram {
  positionLocation: GLint;
  sizeLocation: GLint;
  colorLocation: GLint;
  angleLocation: GLint;

  insideColorLocation: GLint;

  matrixLocation: WebGLUniformLocation;
  sqrtZoomRatioLocation: WebGLUniformLocation;
  correctionRatioLocation: WebGLUniformLocation;

  constructor(gl: WebGLRenderingContext) {
    super(gl, vertexShaderSource, fragmentShaderSource, POINTS, ATTRIBUTES);

    // Locations
    this.positionLocation = gl.getAttribLocation(this.program, 'a_position');
    this.sizeLocation = gl.getAttribLocation(this.program, 'a_size');
    this.colorLocation = gl.getAttribLocation(this.program, 'a_color');
    this.angleLocation = gl.getAttribLocation(this.program, 'a_angle');
    this.insideColorLocation = gl.getAttribLocation(
      this.program,
      'a_insideColor'
    );

    // Uniform Location
    const matrixLocation = gl.getUniformLocation(this.program, 'u_matrix');
    if (matrixLocation === null)
      throw new Error('NodeProgram: error while getting matrixLocation');
    this.matrixLocation = matrixLocation;

    const sqrtZoomRatioLocation = gl.getUniformLocation(
      this.program,
      'u_sqrtZoomRatio'
    );
    if (sqrtZoomRatioLocation === null)
      throw new Error('NodeProgram: error while getting sqrtZoomRatioLocation');
    this.sqrtZoomRatioLocation = sqrtZoomRatioLocation;

    const correctionRatioLocation = gl.getUniformLocation(
      this.program,
      'u_correctionRatio'
    );
    if (correctionRatioLocation === null)
      throw new Error(
        'NodeProgram: error while getting correctionRatioLocation'
      );
    this.correctionRatioLocation = correctionRatioLocation;

    this.bind();
  }

  bind(): void {
    const gl = this.gl;

    gl.enableVertexAttribArray(this.positionLocation);
    gl.enableVertexAttribArray(this.sizeLocation);
    gl.enableVertexAttribArray(this.colorLocation);
    gl.enableVertexAttribArray(this.angleLocation);
    gl.enableVertexAttribArray(this.insideColorLocation);

    gl.vertexAttribPointer(
      this.positionLocation,
      2,
      gl.FLOAT,
      false,
      this.attributes * Float32Array.BYTES_PER_ELEMENT,
      0
    );
    gl.vertexAttribPointer(
      this.sizeLocation,
      1,
      gl.FLOAT,
      false,
      this.attributes * Float32Array.BYTES_PER_ELEMENT,
      8
    );
    gl.vertexAttribPointer(
      this.colorLocation,
      4,
      gl.UNSIGNED_BYTE,
      true,
      this.attributes * Float32Array.BYTES_PER_ELEMENT,
      12
    );
    gl.vertexAttribPointer(
      this.angleLocation,
      1,
      gl.FLOAT,
      false,
      this.attributes * Float32Array.BYTES_PER_ELEMENT,
      16
    );
    // custom
    gl.vertexAttribPointer(
      this.insideColorLocation,
      4,
      gl.UNSIGNED_BYTE,
      true,
      ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
      20
    );
  }

  process(
    data: NodeDisplayData & { dotColor: string; insideColor: string },
    hidden: boolean,
    offset: number
  ): void {
    const color = floatColor(data.color);

    // custom
    const insideColor = floatColor(data.insideColor || data.color);

    let i = offset * POINTS * ATTRIBUTES;
    const array = this.array;

    if (hidden) {
      array[i++] = 0;
      array[i++] = 0;
      array[i++] = 0;
      array[i++] = 0;
      array[i++] = 0;
      array[i++] = 0;

      return;
    }

    array[i++] = data.x;
    array[i++] = data.y;
    array[i++] = data.size;
    array[i++] = color;
    array[i++] = ANGLE_1;
    array[i++] = insideColor;

    array[i++] = data.x;
    array[i++] = data.y;
    array[i++] = data.size;
    array[i++] = color;
    array[i++] = ANGLE_2;
    array[i++] = insideColor;

    array[i++] = data.x;
    array[i++] = data.y;
    array[i++] = data.size;
    array[i++] = color;
    array[i++] = ANGLE_3;
    array[i++] = insideColor;
  }

  bufferData(): void {
    const gl = this.gl;
    gl.bufferData(gl.ARRAY_BUFFER, this.array, gl.DYNAMIC_DRAW);
  }

  render(params: RenderParams): void {
    if (this.hasNothingToRender()) return;

    const gl = this.gl;
    const program = this.program;

    gl.useProgram(program);

    gl.uniformMatrix3fv(this.matrixLocation, false, params.matrix);
    gl.uniform1f(this.sqrtZoomRatioLocation, Math.sqrt(params.ratio));
    gl.uniform1f(this.correctionRatioLocation, params.correctionRatio);

    gl.drawArrays(gl.TRIANGLES, 0, this.array.length / ATTRIBUTES);
  }
}
