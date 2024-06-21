varying float vDistanceToCenter;

uniform float uProgress;

void main() {

    float distanceToCenter = length(gl_PointCoord - 0.5);

    if(distanceToCenter > 0.5) {
        discard;
    }
     gl_FragColor = vec4(sin(1.0 * vDistanceToCenter * 0.1), cos(vDistanceToCenter * 1.0 * 0.7), 1.0 * vDistanceToCenter * 0.5   + uProgress, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}