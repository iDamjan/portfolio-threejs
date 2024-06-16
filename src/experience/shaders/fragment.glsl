varying vec2 vParticlesUv;
varying float vOpacity;
varying float vDistanceToCenter;

uniform float uProgress;

void main() {

    float distanceToCenter = length(gl_PointCoord - 0.5);

    if(distanceToCenter > 0.5) {
        discard;
    }
     gl_FragColor = vec4(sin(vOpacity * vDistanceToCenter * 0.1), cos(vDistanceToCenter * vOpacity * 0.7), vOpacity * vDistanceToCenter * 0.5   + uProgress, vOpacity);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}