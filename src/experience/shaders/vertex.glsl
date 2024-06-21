#include "./includes/simplexNoise4d.glsl"

attribute float aSize;
attribute vec3 aNewPosition;

uniform float uProgress;
varying float vDistanceToCenter;

void main() {

    float noiseOrigin = simplexNoise4d(vec4(position * 0.1, 0.0));
    float noiseTarget = simplexNoise4d(vec4(aNewPosition * 0.2, 0.0));
    float noise = mix(noiseOrigin, noiseTarget, uProgress);
    noise = smoothstep(-0.5, 0.5, noise);

    float duration = 0.2;
    float delay = (1. - duration) * noise;
    float end = delay + duration;

    float progress = smoothstep(delay, end, uProgress * 2.0);

    vec3 particle = mix(position, aNewPosition, progress);


    // Final position
    vec4 modelPosition = modelMatrix * vec4(particle, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vec3 sceneCenter = vec3(0.0, 0.0, 0.0);

    float distanceToPoint = distance(modelPosition.xyz, sceneCenter);
    vDistanceToCenter = distanceToPoint / 8.0;


    // Point size
    gl_PointSize = 60.0 * aSize;
    gl_PointSize *= (1.0 / - viewPosition.z);


    
}