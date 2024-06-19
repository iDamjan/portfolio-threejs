#include "../includes/simplexNoise4d.glsl"

uniform sampler2D uPosition;
uniform sampler2D uVelocity;
uniform sampler2D uBase;
uniform sampler2D uNewBase;
uniform sampler2D uNewPosition;
uniform float uTime;
uniform float uDeltaTime;
uniform float uProgress;
uniform float uStrength;
varying vec2 vUv;


void main() {
    vec4 newPosition = texture(uNewPosition, vUv);
    vec4 oldPosition = texture(uPosition, vUv);
    
    vec4 oldBase = texture(uBase, vUv);
    vec4 newBase = texture(uNewBase, vUv);

    vec4 baseParticle = mix(oldBase, newBase, uProgress);


    

    vec4 mixedPosition = mix(oldPosition, oldBase, smoothstep(0.5, 0.0, uProgress));

    float noiseOrigin = simplexNoise4d(vec4(mixedPosition.xyz * 0.1, 0.0));
    float noiseTarget = simplexNoise4d(vec4(newPosition.xyz * 0.2, 0.0));
    float noise = mix(noiseOrigin, noiseTarget, uProgress);
    noise = smoothstep(-0.5, 0.5, noise);

    float duration = 0.3;
    float delay = (0.5 - duration) * noise;
    float end = delay + duration;

    float progress = smoothstep(delay, end, uProgress);

    vec4 particle = mix(mixedPosition, newPosition, progress);

    gl_FragColor = particle;

}