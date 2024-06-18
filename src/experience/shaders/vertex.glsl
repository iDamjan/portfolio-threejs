
attribute vec2 aParticlesUv;
attribute float aSize;


varying vec2 vParticlesUv;
varying float vOpacity;
varying float vDistanceToCenter;

uniform sampler2D uPosition;

void main() {

    vec4 particle = texture(uPosition, aParticlesUv);

    // Final position
    vec4 modelPosition = modelMatrix * vec4(particle.xyz, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vec3 sceneCenter = vec3(0.0, 0.0, 0.0);

    float distanceToPoint = distance(modelPosition.xyz, sceneCenter);
    vDistanceToCenter = distanceToPoint / 8.0;


    // Point size
    gl_PointSize = 50.0 * aSize;
    gl_PointSize *= (1.0 / - viewPosition.z);

    // Varyings 
    vParticlesUv = aParticlesUv;

    vOpacity = particle.a;
    
}