varying float vDistanceToCenter;
varying vec4 vColor;
uniform float uProgress;

void main() {

    float distanceToCenter = length(gl_PointCoord - 0.5);

    if(distanceToCenter > 0.5) {
        discard;
    }
     gl_FragColor = vec4(vColor);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}