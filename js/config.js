let canvas=document.getElementById('canvas');
let ctx=canvas.getContext('2d');

const CIRCLE_RADIUS=[9,12,18,24,36,48];

const ORANGE_COLOR="rgba(230,90,60,0.8)";
const YELLOW_COLOR="rgba(230,220,60,0.8)";
const GREEN_COLOR="rgba(70,230,60,0.8)";
const CYAN_COLOR="rgba(60,230,190,0.8)";
const BLUE_COLOR="rgba(60,90,230,0.8)";
const PINK_COLOR="rgba(190,60,230,0.8)";



const COLORS=[ORANGE_COLOR,YELLOW_COLOR,GREEN_COLOR,CYAN_COLOR,BLUE_COLOR,PINK_COLOR];

const NUMBER_OF_SECTIONS=7;

const WIDTH=canvas.width;

const HEIGHT=canvas.height;

const GRAY_SCALE_COLORS=["#343434","#4C4C4C","#575757","#6C6C6C","#7A7A7A","#878585","#9D9C9C"];

const BALLS_TO_WIN=4;