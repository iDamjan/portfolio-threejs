import "./ScrollDownAni.scss";

const ScrollDownAni = () => {
  return (
    <div className="ScrollDownAni">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
        <g id="arrowLeft">
          <polygon
            points="223.94 165.979 219.928 312.194 215.916 165.979 223.94 165.979"
            fill="#fff"
          />
        </g>
        <g id="arrowRight">
          <polygon
            points="269.86 237.08 265.848 383.296 261.836 237.08 269.86 237.08"
            fill="#fff"
          />
        </g>
        <g id="Lines">
          <rect
            x="217.921"
            y="64.333"
            width="4.012"
            height="364.703"
            fill="#fff"
          />
          <rect
            x="263.843"
            y="64.333"
            width="4.012"
            height="364.703"
            fill="#fff"
          />
        </g>
      </svg>
    </div>
  );
};

export default ScrollDownAni;