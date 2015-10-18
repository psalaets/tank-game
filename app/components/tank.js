var React = require('react');

var Tank = React.createClass({
  propTypes: {
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
    // degrees
    rotation: React.PropTypes.number.isRequired
  },
  makeSvg() {
    var markup = `
    <g
       id="tank-body">
      <path
         style="fill:#00ae3a;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
         d="m 200.65928,90.63997 c 0,0 -22.78016,17.93332 -24.23421,55.73869 -1.45406,37.80537 -1.45406,130.38006 -1.45406,130.38006 0,0 -0.48468,48.46843 6.78558,63.49364 7.27027,15.02521 12.60179,22.29547 19.38737,25.20358 6.78558,2.90811 20.84143,3.87747 20.84143,3.87747 l 4.84684,-8.72431 134.25754,0 3.87747,8.23963 22.29548,-2.90811 c 0,0 18.90268,-3.87747 27.14231,-66.88642 l -1.45405,-154.12959 -8.72432,-28.59637 -7.75494,-16.963954 -6.78558,-10.178369 -31.50448,2.423421 -60.58553,0.969369 -75.12606,-2.423421 z"
         id="path4466" />
      <path
         style="fill:#b9b9b9;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
         d="m 182.09488,116.91584 -0.82896,-19.342397 3.31584,-14.92128 1.65792,-2.48688 68.52736,-0.27632 3.03952,5.25008 0,5.25008 -53.32976,-0.82896 -3.31584,0.82896 -11.60544,13.539677 z"
         id="path4468" />
      <path
         id="path4470"
         d="m 405.08276,116.3632 0.82896,-19.342397 -3.31584,-14.92128 -1.65792,-2.48688 -68.52736,-0.27632 -3.03952,5.25008 0,5.25008 53.32976,-0.82896 3.31584,0.82896 11.60544,13.539677 z"
         style="fill:#b9b9b9;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
      <path
         style="fill:#b9b9b9;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
         d="m 184.30544,347.91936 -1.65792,10.77648 1.65792,11.32912 1.65792,4.1448 14.36864,0 5.80272,0.55264 2.7632,-6.35536 -4.1448,-1.93424 -6.908,-1.65792 -5.5264,-4.97376 -4.42112,-7.73696 z"
         id="path4472" />
      <path
         id="path4474"
         d="m 404.19085,346.35626 1.65792,10.77648 -1.65792,11.32912 -1.65792,4.1448 -14.36864,0 -9.94752,0.27632 -10.50016,-4.1448 16.02656,-3.86848 6.908,-1.65792 5.5264,-4.97376 4.42112,-7.73696 z"
         style="fill:#b9b9b9;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
      <path
         style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
         d="m 209.29188,368.0278 -3.90678,6.69734 -1.67434,10.04601"
         id="path4476" />
      <path
         style="fill:#979797;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
         d="m 210.14822,367.83711 -4.93305,9.27415 -1.7759,7.49824 3.15715,8.09022 0.98661,2.95983 4.93306,2.76251 7.89289,3.35448 0.98661,9.07682 5.13038,0.78929 135.16576,1.18394 3.15716,-0.59197 2.95983,-7.30092 0.78929,-4.53842 6.90628,0.59197 3.5518,1.57858 4.53841,5.72235 3.15716,3.15715 5.13038,3.35448 3.5518,2.36787 4.73574,1.7759 4.53841,-1.57858 2.76251,-4.53841 2.17055,-4.93306 -0.19733,-5.52502 -0.98661,-6.90628 -1.38125,-2.95984 -1.18394,-1.18393 -7.69557,-3.15716 -9.27414,-7.49824 -5.72235,-5.32771 -5.52502,-2.56518 -6.70896,-2.36787 -6.31431,-0.98661 -2.95984,-7.89289 -133.38986,-0.98662 -3.15715,4.34109 -2.36787,4.14377 z"
         id="path4478" />
      <path
         style="display:inline;fill:#000000;fill-opacity:0.49044584;stroke:none;stroke-width:1.80599999;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 405.38125,391.80566 c 0,0 -8.12239,0.44304 -9.00847,11.96207 -0.88608,11.51903 -0.88608,9.74687 2.80592,14.76798 3.692,5.02112 10.78063,-9.15615 10.78063,-12.55278 0,-3.39664 1.32912,-11.66671 -4.57808,-14.17727 z"
         id="path4481" />
      <path
         style="display:inline;fill:#000000;fill-opacity:0.49044584;stroke:none;stroke-width:1.80599999;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 367.82347,383.57351 c 0,0 10.54633,3.45688 9.93232,9.88818 -0.70225,7.35543 3.04158,9.59282 3.04158,9.59282 l -12.77912,-2.8311 0.58761,-9.9886 z"
         id="path4483" />
      <path
         style="display:inline;fill:#000000;fill-opacity:0.49044584;stroke:none;stroke-width:1.80599999;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 366.09841,403.02932 -145.02164,0 1.4768,9.26819 24.81022,0.33101 117.84854,-0.66201 z"
         id="path4485" />
      <path
         style="display:inline;fill:#000000;fill-opacity:0.49044584;stroke:none;stroke-width:1.80599999;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 209.70542,368.32456 -1.62448,4.43039 c 0,0 2.9536,-2.95359 6.35024,-0.14768 3.39663,2.80592 4.28271,17.27855 4.28271,17.27855 l 4.13504,-20.5275 -1.32912,-1.03376 -11.66671,0.44304 z"
         id="path4487" />
      <path
         style="display:inline;fill:#000000;fill-opacity:0.49044584;stroke:none;stroke-width:1.80599999;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 219.00925,395.79301 c 0,0 -4.13503,4.13504 -8.41775,1.03376 l 5.75952,4.28272 2.95359,0 0.14768,-5.1688 z"
         id="path4489" />
      <path
         style="display:inline;fill:#000000;fill-opacity:0.49044584;stroke:none;stroke-width:1.80599999;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 405.23357,344.10506 0.29536,9.00847 c 0,0 -15.3587,17.42623 -15.50638,19.49374 -0.14768,2.06752 -5.46416,0.44304 -5.46416,0.44304 l -6.49791,0 -9.30383,-3.39663 4.57807,-2.06752 14.62031,-1.03376 5.16879,-5.1688 5.46416,-8.71311 z"
         id="path4491" />
      <path
         style="display:inline;fill:#000000;fill-opacity:0.49044584;stroke:none;stroke-width:1.80599999;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 183.56608,348.68313 c 0,0 1.32912,17.86927 11.22367,21.70895 9.89456,3.83967 10.04224,4.13503 10.04224,4.13503 l 3.83967,-4.28271 0.59072,-2.51056 -9.00847,-2.65824 -6.6456,-6.79327 -7.23631,-6.79328 z"
         id="path4493" />
      <path
         style="display:inline;fill:#000000;fill-opacity:0.49044584;stroke:none;stroke-width:1.80599999;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 398.73566,418.38803 c -2.06752,-1.77215 -3.39664,-9.00847 -3.39664,-9.00847 -5.02111,0 -15.06334,-5.75951 -15.06334,-5.75951 -1.91984,-3.54432 5.02111,10.18991 18.60766,15.21102"
         id="path4495" />
      <path
         style="display:inline;fill:#000000;fill-opacity:0.49044584;stroke:none;stroke-width:1.80599999;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 405.08589,391.36262 c 0,0 1.62448,26.58238 -4.72575,26.73005 -6.35024,0.14768 -4.28272,-14.17726 -4.28272,-14.17726 0,0 0.7384,-10.48527 9.00847,-12.55279 z"
         id="path4497" />
      <path
         style="display:inline;fill:#000000;fill-opacity:0.49044584;stroke:none;stroke-width:1.80599999;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 178.98801,328.15563 2.65823,15.06335 10.3376,15.65407 9.45151,6.79327 18.01694,3.54432 4.13504,-1.4768 3.54432,-7.08864 133.5026,0.59072 2.06752,5.61184 8.86079,0.88608 12.70047,-1.77216 8.27007,-2.9536 6.49792,-8.27007 3.54432,-7.08863 5.02111,-14.17727 -0.29536,-7.97472 c 0,0 -11.81439,30.1267 -46.66684,29.53598 -34.85245,-0.59072 -134.38868,-1.4768 -134.38868,-1.4768 0,0 -34.26173,1.77216 -47.25756,-25.40094 z"
         id="path4499" />
      <path
         style="display:inline;fill:#000000;fill-opacity:0.49044584;stroke:none;stroke-width:1.80599999;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 180.69291,105.06544 c 0,0 4.84331,-19.373257 18.25557,-19.74582 13.41225,-0.372562 51.78621,4.09819 51.78621,4.09819 l 1.86281,-3.725627 1.11769,-4.843315 2.9805,0 1.86282,11.176881 -34.27577,-1.862814 -22.72632,-1.49025 -8.94151,8.196379 -8.19638,16.392756 -3.35306,5.21588 z"
         id="path4503" />
      <path
         style="display:inline;fill:#000000;fill-opacity:0.49044584;stroke:none;stroke-width:1.80599999;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 328.97286,91.653186 1.86281,-11.176881 0.37256,-0.372562 c 0,0 5.21588,1.862813 5.96101,12.294569 0,0 46.19777,-9.68663 55.13927,-6.333566 8.94151,3.353064 12.66714,26.079384 12.66714,26.079384 l -13.0397,-19.745818 -5.961,-2.980502 -37.25627,3.725627 L 334.5613,93.516 Z"
         id="path4505" />
      <path
         style="fill:#ffffff;fill-opacity:0.77707005;stroke:none;stroke-width:1.80599999;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 223.21513,368.85721 141.36027,-3.16616 4.19053,17.80971 -148.62385,1.18732 z"
         id="path4547" />
      <path
         style="fill:#ffffff;fill-opacity:0.77707005;stroke:none;stroke-width:1.80599999;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 207.84989,378.26261 c 0,0 -3.07305,8.93978 1.39684,10.89536 4.46989,1.95558 8.10167,-0.27937 9.77788,2.23494 1.67621,2.51432 1.39684,-3.35241 1.39684,-3.35241 l -7.82231,0 c 0,0 3.35242,-13.40967 -4.74925,-9.77789 z"
         id="path4549" />
      <path
         style="fill:#ffffff;fill-opacity:0.77707005;stroke:none;stroke-width:1.80599999;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 365.69288,372.39588 c 0,0 7.26357,-0.55874 12.57157,5.30799 5.30799,5.86673 11.73345,11.17473 21.23197,15.92399 l -1.95558,4.46989 c 0,0 -13.1303,-4.46988 -17.32082,-9.77788 -3.7168,-4.70796 -6.70484,-12.01284 -12.2922,-11.4541 -5.58736,0.55874 -2.23494,-4.46989 -2.23494,-4.46989 z"
         id="path4551" />
      <path
         style="fill:none;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:3.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 406.47177,120.04995 c 0,0 0.89432,-33.537276 -5.36597,-40.244736 l -69.31037,-0.44716 c 0,0 -2.68298,3.57731 -2.68298,11.17909"
         id="path4174" />
      <path
         id="path4185"
         d="m 180.69832,120.94428 c 0,0 -0.89432,-33.537279 5.36597,-40.244739 l 69.31037,-0.44716 c 0,0 2.68298,3.57731 2.68298,11.17909"
         style="fill:none;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:3.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1.70000017;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 332.68976,79.805218 c 0,0 4.02447,4.9188 3.57731,11.626255"
         id="path4187" />
      <path
         id="path4189"
         d="m 254.66298,79.805218 c 0,0 -4.02447,4.9188 -3.57731,11.626255"
         style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1.70000017;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         style="fill:none;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:3.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 183.3371,345.42043 c 0,0 -3.13015,16.99222 2.68298,29.06564 l 20.16385,0"
         id="path4191" />
      <path
         id="path4193"
         d="m 405.17723,344.5261 c 0,0 3.13015,16.99222 -2.68298,29.06564 l -23.15247,0"
         style="fill:none;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:3.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      <path
         style="fill:none;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:5.69999981;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 223.6829,368.0999 c -6.91784,-0.35489 -13.78528,-0.76436 -20.59151,-1.22733 0,0 -9.39044,-0.89433 -19.6752,-21.01669 -10.28476,-20.12236 -9.30371,-120.24168 -8.94327,-173.94667 0.44717,-66.62737 26.15907,-82.501682 26.15907,-82.501682 0,0 104.85988,5.14238 187.138,0.44716 0,0 26.38267,15.874312 26.38265,85.631842 0,69.75753 5.81313,174.39382 -26.82982,190.49171 0,0 -5.05854,0.50306 -14.26033,1.14586 -3.02095,0.19832 -6.04652,0.38533 -9.07588,0.56113"
         id="path4172" />
      <path
         style="fill:none;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:2.5999999;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 209.94333,367.55503 c 0,0 -11.40267,15.87431 -2.90656,25.71191 8.49611,9.8376 12.04323,7.20556 12.04323,7.20556"
         id="path4197" />
      <path
         style="fill:none;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:2.5999999;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 368.01569,400.42156 c 0,0 8.94327,-0.89433 11.62626,3.13015 2.68298,4.02447 12.96774,14.30923 21.46385,15.65072 0,0 8.15596,-3.20288 8.49611,-14.7564 0.34014,-11.55352 -4.02447,-12.96774 -4.02447,-12.96774 -4.9188,-2.23582 -9.39044,-2.68298 -14.7564,-8.49611 -5.36597,-5.81313 -11.28097,-11.70739 -25.14305,-12.60172"
         id="path4199" />
      <path
         style="fill:none;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:4.4000001;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 226.70999,360.98034 135.01418,0.31619 c 0,0 6.32385,15.49343 6.32385,31.93544 0,16.44201 -2.21335,18.97155 -2.21335,18.97155 l -142.91899,0.31619 c 0,0 -3.16192,0.31619 -2.84573,-16.7582 0.31619,-17.07439 2.84573,-29.72209 6.64004,-34.78117 z"
         id="path4195" />
      <path
         style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
         d="m 405.91282,392.26082 c 0,0 -7.88984,-2.42012 -10.0612,12.29701 -1.94682,13.19525 4.80702,13.75028 4.80702,13.75028"
         id="path4201" />
    </g>
    <g
       id="tank-turrent">
      <path
         transform="translate(-3.8833872e-6,1.4468955e-6)"
         style="fill:#008e2f;fill-opacity:1;stroke:none;stroke-width:1.80599999;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 228.00837,109.16363 1.11769,13.41226 -21.9812,1.49025 -8.94151,13.03969 c 0,0 -4.47075,37.25627 -4.47075,65.57104 0,28.31476 2.23538,83.45404 2.23538,83.45404 0,0 34.64833,33.53064 95.74861,33.90321 61.10028,0.37256 96.49373,-29.05989 96.49373,-29.05989 l 3.35307,-4.84332 3.35306,-67.43385 -2.9805,-79.35585 -1.49025,-2.9805 -7.82382,-12.66713 -21.60863,-1.49025 1.11769,-14.52995 -5.21588,-2.60794 -121.08288,0.37257 z"
         id="path4521" />
      <path
         transform="translate(-3.8833872e-6,1.4468955e-6)"
         style="fill:#9e9e9e;fill-opacity:1;stroke:none;stroke-width:1.80599999;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 324.87467,105.43801 0.37256,-24.961705 -6.33357,-0.372562 0.18629,-13.971101 3.72562,-1.117688 1.67653,-3.539346 -0.37256,-13.225976 c 0,0 -10.24547,-5.215877 -28.31476,-5.029596 -18.06929,0.186281 -30.92271,5.961003 -30.92271,5.961003 l 0.55885,15.27507 3.35306,2.980502 1.30397,0.558844 0.74513,13.039694 -6.89241,0.745126 0.9314,23.098885 z"
         id="path4523" />
      <path
         transform="translate(-3.8833872e-6,1.4468955e-6)"
         style="display:inline;fill:#ffffff;fill-opacity:0.77707005;stroke:none;stroke-width:1.80599999;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 284.88522,104.23953 -0.19607,-23.902718 6.6662,-0.197543 -0.98033,25.087971 z"
         id="path4556" />
      <path
         transform="translate(-3.8833872e-6,1.4468955e-6)"
         style="display:inline;fill:#ffffff;fill-opacity:0.77707005;stroke:none;stroke-width:1.80599999;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 283.3167,104.83216 -0.39212,-24.100262 -7.84259,0.592629 1.37245,24.100253 z"
         id="path4558" />
      <path
         transform="translate(-3.8833872e-6,1.4468955e-6)"
         style="display:inline;fill:#ffffff;fill-opacity:0.77707005;stroke:none;stroke-width:1.80599999;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 273.95099,80.714684 -0.17075,-15.8878 4.28197,-0.553029 0.4201,16.609486 z"
         id="path4560" />
      <path
         transform="translate(-3.8833872e-6,1.4468955e-6)"
         style="display:inline;fill:#ffffff;fill-opacity:0.77707005;stroke:none;stroke-width:1.80599999;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 280.66075,80.285925 0.24544,-15.585446 2.57713,-0.12272 0.24544,16.321766 z"
         id="path4562" />
      <path
         transform="translate(-3.8833872e-6,1.4468955e-6)"
         style="display:inline;fill:#ffffff;fill-opacity:0.77707005;stroke:none;stroke-width:1.80599999;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 270.84315,62.000638 -0.6136,-15.953607 3.19072,-0.98176 0.36816,16.812647 z"
         id="path4564" />
      <path
         transform="translate(-3.8833872e-6,1.4468955e-6)"
         style="display:inline;fill:#ffffff;fill-opacity:0.77707005;stroke:none;stroke-width:1.80599999;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 275.62923,61.141597 -0.36816,-16.321766 12.76289,-1.472641 0.12272,17.058087 z"
         id="path4566" />
      <path
         transform="translate(-3.8833872e-6,1.4468955e-6)"
         style="fill:#000000;fill-opacity:0.49019608;stroke:none;stroke-width:1.80599999;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 231.03424,120.87176 5.05388,-3.85057 12.03303,0.24066 108.05664,0 5.5352,3.12859 -1.68463,2.4066 -22.6221,-1.92528 -24.30673,-2.16595 -58.7212,0.96265 z"
         id="path4530" />
      <path
         transform="translate(-3.8833872e-6,1.4468955e-6)"
         style="fill:#000000;fill-opacity:0.49019608;stroke:none;stroke-width:1.80599999;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 372.91702,197.86474 c 0,0 9.3346,57.64112 -44.80605,56.70766 -54.14064,-0.93346 -53.20718,-45.73951 -53.20718,-45.73951 0,0 8.6345,41.07221 49.23998,41.07221 40.60548,0 49.47335,-39.43866 48.77325,-52.04036 z"
         id="path4532" />
      <path
         transform="translate(-3.8833872e-6,1.4468955e-6)"
         style="fill:#000000;fill-opacity:0.49019608;stroke:none;stroke-width:1.80599999;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 307.3415,230.76918 -14.00189,8.86787 c 0,0 8.16777,10.96814 30.10407,10.26805 21.93629,-0.7001 31.97098,-11.20151 31.97098,-11.20151 l -12.13497,-10.96815 c 0,0 -3.50048,7.23431 -18.20246,7.46767 -14.70199,0.23337 -17.73573,-4.43393 -17.73573,-4.43393 z"
         id="path4534" />
      <path
         transform="translate(-3.8833872e-6,1.4468955e-6)"
         style="fill:#000000;fill-opacity:0.49019608;stroke:none;stroke-width:1.80599999;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 390.18602,288.4103 c 0,0 -35.00473,32.20435 -91.47902,32.43771 -56.47429,0.23337 -101.74707,-33.37117 -101.74707,-33.37117 0,0 63.24187,28.00378 98.71333,26.37023 35.47146,-1.63356 76.07694,-17.73573 94.51276,-25.43677 z"
         id="path4536" />
      <path
         transform="translate(-3.8833872e-6,1.4468955e-6)"
         style="fill:#000000;fill-opacity:0.49019608;stroke:none;stroke-width:1.80599999;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 324.99698,99.710777 c 0,0 -12.31404,3.585103 -28.52492,3.585103 -16.21088,0 -31.64239,-1.40287 -31.64239,-1.40287 l 0,3.5851 41.61832,0.46762 18.23724,0.15588 z"
         id="path4538" />
      <path
         transform="translate(-3.8833872e-6,1.4468955e-6)"
         style="fill:#000000;fill-opacity:0.49019608;stroke:none;stroke-width:1.80599999;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 318.60615,77.264943 c 0,0 -6.70258,0.623495 -23.38108,0.623495 -16.6785,0 -25.25156,-0.623495 -25.25156,-0.623495 l 0.15587,3.585099 24.93982,-1.091117 23.38107,0.935243 z"
         id="path4540" />
      <path
         transform="translate(-3.8833872e-6,1.4468955e-6)"
         style="fill:#000000;fill-opacity:0.49019608;stroke:none;stroke-width:1.80599999;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 323.74999,63.859792 c 0,0 -4.2086,-3.896846 -29.30429,-3.585099 -25.09569,0.311748 -29.14841,3.117477 -29.14841,3.117477 l 3.89685,4.052721 2.80573,-1.870487 21.51059,-1.24699 14.96389,0 9.66418,0.935243 2.49398,1.714612 z"
         id="path4542" />
      <path
         transform="translate(-3.8833872e-6,1.4468955e-6)"
         style="fill:#000000;fill-opacity:0.49019608;stroke:none;stroke-width:1.80599999;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 318.9179,68.691881 c 0,0 -9.04069,-2.961603 -24.93982,-2.649855 -15.89913,0.311748 -23.69283,2.493981 -23.69283,2.493981 l -0.62349,-2.649855 20.8871,-2.02636 11.06704,0.779369 10.1318,0.467622 7.63782,0.467621 z"
         id="path4544" />
      <g
         id="g4507">
        <ellipse
           ry="48.812447"
           rx="49.062397"
           cy="201.06696"
           cx="323.44608"
           id="path4401"
           style="fill:none;fill-opacity:1;stroke:#000000;stroke-width:2.66199994;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
        <ellipse
           style="fill:none;fill-opacity:1;stroke:#000000;stroke-width:1.80599999;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
           id="ellipse4423"
           cx="323.44608"
           cy="201.06696"
           rx="33.805706"
           ry="34.081932" />
        <path
           id="path4425"
           d="m 206.61892,124.53056 -9.47036,12.33376 c 0,0 -7.44167,71.528 -0.7015,150.54455 0,0 35.48934,32.80089 98.56188,33.37374 63.07254,0.57285 96.80811,-33.73649 96.80811,-33.73649 0,0 6.31358,-103.38602 -0.70151,-150.9073 l -8.41809,-12.33378 c 0,0 -41.73973,-3.62757 -88.39002,-4.35309 -46.65029,-0.72552 -87.68851,5.07861 -87.68851,5.07861 z"
           style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:3.91700006;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
        <path
           id="path4447"
           d="m 195.44863,286.10313 c 0,0 58.15982,27.69515 98.91125,27.69515 40.75144,0 97.32867,-26.90386 97.32867,-26.90386"
           style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
        <path
           id="path4449"
           d="m 361.84287,119.40776 0.39657,-11.62923 -5.94846,-2.05222 -120.95189,-0.34204 -6.34502,3.42036 0.39656,10.60313 6.74159,-2.73629 118.96907,0.34203 z"
           style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:3.63037419;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
        <path
           id="path4451"
           d="m 356.15044,106.29242 -0.39564,12.66064"
           style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1.70000005;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
        <path
           id="path4453"
           d="m 235.87436,105.89678 0.79129,12.26499"
           style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1.70000005;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
        <path
           id="path4455"
           d="m 324.95166,105.30033 0.39653,-24.187985 c 0,0 -11.49921,-0.991311 -30.13585,-0.991311 -18.63664,0 -31.52368,1.586097 -31.52368,1.586097 l 0.99131,23.394929"
           style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:2.70000005;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
        <path
           id="path4457"
           d="m 319.99511,66.440946 c 0,0 2.77567,0.198262 3.76698,-1.387835 l 0.39652,-16.852283 c 0,0 -5.55134,-4.936627 -30.13584,-4.936627 -24.58451,0 -29.14454,5.729676 -29.14454,5.729676 l 0.39652,16.257496 c 0,0 1.38784,1.586097 4.56003,1.784359"
           style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:3.9000001;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
        <path
           id="path4459"
           d="m 267.25738,62.854847 c 0,0 7.93456,-2.227086 28.54975,-2.577408 17.05269,-0.289783 25.77408,2.379146 25.77408,2.379146"
           style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1.20000005;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
        <path
           id="path4461"
           d="m 318.80554,81.112345 0.39652,-15.66271 c 0,0 -2.97393,-1.189573 -23.98972,-1.189573 -21.01579,0 -25.37756,1.784359 -25.37756,1.784359 l 0.59479,14.473137"
           style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:2.20000005;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      </g>
    </g>
    </g>
    `;

    return {
      __html: markup
    };
  },
  render() {
    var {x, y, rotation} = this.props;

    var transform = `translate(${x} ${y}) rotate(${rotation})`;

    var props = {
      transform,
      width: 90,
      height: 90
    };

    return (
      <g {...props} dangerouslySetInnerHTML={this.makeSvg()}>

      </g>
    );
  }
});

module.exports = Tank;