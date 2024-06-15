
attribute vec2 aParticlesUv;
varying vec2 vUv;

void main() {


    // Final position
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    // Point size
    gl_PointSize = 10.0;
    gl_PointSize *= (1.0 / - viewPosition.z);

    // Varyings 
    vUv = uv;
    
}