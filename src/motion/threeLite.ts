/**
 * The few three.js classes Vanta's "Net" effect uses, re-exported so the bundler drops the rest of the library.
 * Vanta takes this object as its `THREE` option. If Vanta is upgraded or the effect changed, add what it needs here.
 */
export {
  AdditiveBlending,
  AmbientLight,
  BufferAttribute,
  BufferGeometry,
  Color,
  DynamicDrawUsage,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshLambertMaterial,
  Object3D,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  SpotLight,
  Vector2,
  Vector3,
  VertexColors,
  WebGLRenderer,
} from 'three'
