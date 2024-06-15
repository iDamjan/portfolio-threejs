#include "../includes/simplexNoise4d.glsl"

uniform sampler2D uBase;
uniform float uTime;
uniform float uDeltaTime;

// Function to compute a 3D noise vector
vec3 snoiseVec3(vec3 x) {
    float s = simplexNoise4d(vec4(x, uTime));
    float s1 = simplexNoise4d(vec4(x.y - 19.1, x.z + 33.4, x.x + 47.2, uTime));
    float s2 = simplexNoise4d(vec4(x.z + 74.2, x.x - 124.5, x.y + 99.4, uTime));
    return vec3(s, s1, s2);
}

// Function to compute curl noise
vec3 curlNoise(vec3 p) {
    const float e = 0.1;
    vec3 dx = vec3(e, 0.0, 0.0);
    vec3 dy = vec3(0.0, e, 0.0);
    vec3 dz = vec3(0.0, 0.0, e);

    vec3 p_x0 = snoiseVec3(p - dx);
    vec3 p_x1 = snoiseVec3(p + dx);
    vec3 p_y0 = snoiseVec3(p - dy);
    vec3 p_y1 = snoiseVec3(p + dy);
    vec3 p_z0 = snoiseVec3(p - dz);
    vec3 p_z1 = snoiseVec3(p + dz);

    float x = p_y1.z - p_y0.z - p_z1.y + p_z0.y;
    float y = p_z1.x - p_z0.x - p_x1.z + p_x0.z;
    float z = p_x1.y - p_x0.y - p_y1.x + p_y0.x;

    const float divisor = 1.0 / (2.0 * e);
    return normalize(vec3(x, y, z) * divisor);
}

mat3 rotation3dY(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat3(
        c, 0.0, -s,
        0.0, 1.0, 0.0,
        s, 0.0, c
    );
}

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 particle = texture(uParticles, uv);
    vec4 baseParticle = texture(uBase, uv);

    if(particle.a <= 0.0) { 
        particle.a = mod(particle.a, 2.5);
        particle.xyz = baseParticle.xyz;
    } else { 

        // Extract the position (xyz) from the particle
        vec3 particlePos = particle.xyz;

        float verticalDistance = max(length(particle.y), 0.0);
    

        // Rotate the position around the Y axis
        particlePos = rotation3dY(uDeltaTime * verticalDistance * 0.1) * particlePos;

        float flowField = simplexNoise4d(vec4(particle.xyz, 0.0));


        // Reassemble the particle with the rotated position
        particle.xyz = particlePos + curlNoise(particlePos) * 0.002 - flowField * 0.01;
        particle.y += pow(flowField * 0.01, 2.0);
        particle.x += flowField * 0.03;
        particle.z += flowField * 0.02;

        particle.a -= uDeltaTime * 0.3;
    }

    // Set the final color output
    gl_FragColor = particle;
}
