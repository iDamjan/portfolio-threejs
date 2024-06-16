varying vec2 vUv;

void main() { 

   
    float distanceToCenter = length(gl_PointCoord - 0.5);

    if(distanceToCenter > 0.5) {
        discard;
    }


    gl_FragColor = vec4(0.9, 0.9, 0.9, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}