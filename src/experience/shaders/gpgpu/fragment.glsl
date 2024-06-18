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

    float noiseOrigin = simplexNoise4d(vec4(oldPosition.xyz, 0.0));
    float noiseTarget = simplexNoise4d(vec4(newPosition.xyz * 0.2, 0.0));
    float noise = mix(noiseOrigin, noiseTarget, uProgress);
    noise = smoothstep(-1.0, 1.0, noise);

    float duration = 0.5;
    float delay = (1.0 - duration) * noise;
    float end = delay + duration;

    float progress = smoothstep(delay, end, uProgress * 2.0);

    vec4 baseParticle = mix(oldBase, newBase, progress);

    vec4 mixedPosition = mix(oldPosition, oldBase, uProgress * 2.0) ;

    vec4 particle = mix(mixedPosition, newPosition, progress);

    gl_FragColor = particle;

      

    // if(particle.a <= 0.0) { 
    //     particle.a = mod(particle.a, 2.5);
    //     particle.xyz = baseParticle.xyz;
    // } else { 
    //     // Extract the position (xyz) from the particle
    //     vec3 particlePos = particle.xyz;

    //     float verticalDistance = max(length(particle.y), 0.0);
    

    //     // Rotate the position around the Y axis

    //     float flowField = simplexNoise4d(vec4(particle.xyz, 0.0));

    //     // Reassemble the particle with the rotated position
    //     particle.y += pow(flowField * 0.01, 2.0);
    //     particle.x += flowField * 0.003;
    //     particle.z += flowField * 0.002;

    //     particle.a -= uDeltaTime * 0.5;
    // }

    // Set the final color output
    gl_FragColor = particle;
}