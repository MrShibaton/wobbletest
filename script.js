const root = document.documentElement;
let random = 10;
let randomX = 0;
let randomY = 0;
let delayLength = 50;
let randSpeed = 0.4;

document.querySelector('.wobble').innerHTML = document.getElementById('customtext').value;

function wobbleInit() {
  // Create array of any elements with "wobble" class
  let all = document.querySelectorAll('.wobble');

  // Iterate through each "wobble"
  all.forEach(el => {
    // Get the text content of the element
    let text = el.textContent;
    // Create an array of separate letters
    text = text.split(/(?=.)/);
    // Iterate through each letter and give it its own span element and individual animation delay offset
    let textCode = text.map((x, idx) => {
      let delay = (idx + 1) * delayLength;
      return `<span class="wobbletext" style="animation-delay: ${delay}ms">${x === ' ' ? '&nbsp;' : x}</span>`;
    })
    // replace the element's html with our dynamically created html
    el.innerHTML = textCode.join("");
  });
}

wobbleInit();

var randSlider = document.getElementById("randSlider");
var randOutput = document.getElementById("randOutput");
randSlider.value = randOutput.value;
random = randOutput.value;

var randSpeedSlider = document.getElementById("randSpeedSlider");
var randSpeedOutput = document.getElementById("randSpeedOutput");
randSpeedSlider.value = randSpeedOutput.value;
randSpeed = randSpeedOutput.value;

let randomLoopInterval;
if(!randomLoopInterval)
{
  randomLoopInterval = setInterval(randomLoop, (randSpeed * 1000));
}

function randomLoop() {
  let oldX = randomX;
  let newX = Math.max(-random * 3, Math.min(Math.round((Math.random() * 2 - 1) * (Math.random() * random)), random * 3));
  let oldY = randomY;
  let newY = Math.max(-random * 3, Math.min(Math.round((Math.random() * 2 - 1) * (Math.random() * random)), random * 3));
  animateLerp(oldX, newX, oldY, newY, (randSpeed * 1000));
}

function lerp(start, end, t) {
  return start + t * (end - start);
}

let currentX;
let currentY;

function animateLerp(oldX, newX, oldY, newY, duration) {
  let startTime = null;

  function animationLoop(currentTime) {
      if (!startTime) startTime = currentTime;
      let elapsedTime = currentTime - startTime;

      // Calculate the interpolation factor (t) based on the elapsed time
      let t = Math.min(elapsedTime / duration, 1);

      // Interpolate the value
      currentX = lerp(oldX, newX, t);
      currentY = lerp(oldY, newY, t);

      root.style.setProperty('--randomX', currentX + "%");
      root.style.setProperty('--randomY', currentY + "%");

      // Continue the animation until t reaches 1
      if (t < 1) {
          requestAnimationFrame(animationLoop);
      }
      else
      {
        randomX = newX;
        randomY = newY;
        root.style.setProperty('--randomX', newX + "%");
        root.style.setProperty('--randomY', newY + "%");
      }
  }

  // Start the animation loop
  requestAnimationFrame(animationLoop);
}

var xSlider = document.getElementById("xSlider");
var xOutput = document.getElementById("xOutput");
xOutput.value = xSlider.value;
root.style.setProperty('--xWobble', xSlider.value + "%");

xSlider.oninput = function() {
  xOutput.value = this.value;
  root.style.setProperty('--xWobble', this.value + "%");
} 

xOutput.oninput = function() {
  xSlider.value = this.value;
  root.style.setProperty('--xWobble', this.value + "%");
}

var ySlider = document.getElementById("ySlider");
var yOutput = document.getElementById("yOutput");
yOutput.value = ySlider.value;
root.style.setProperty('--yWobble', ySlider.value + "%");

ySlider.oninput = function() {
  applyYWobble(ySlider);
  root.style.setProperty('--yWobble', this.value + "%");
} 

yOutput.oninput = function() {
  applyYWobble(yOutput);
  root.style.setProperty('--yWobble', this.value + "%");
}

var xScaleSlider = document.getElementById("xScaleSlider");
var xScaleOutput = document.getElementById("xScaleOutput");
xScaleOutput.value = xScaleSlider.value;
root.style.setProperty('--xScale', xScaleSlider.value);

xScaleSlider.oninput = function() {
  xScaleOutput.value = this.value;
  root.style.setProperty('--xScale', this.value);
} 

xScaleOutput.oninput = function() {
  xScaleSlider.value = this.value;
  root.style.setProperty('--xScale', this.value);
}

var yScaleSlider = document.getElementById("yScaleSlider");
var yScaleOutput = document.getElementById("yScaleOutput");
yScaleOutput.value = yScaleSlider.value;
root.style.setProperty('--yScale', yScaleSlider.value);

yScaleSlider.oninput = function() {
  yScaleOutput.value = this.value;
  root.style.setProperty('--yScale', this.value);
} 

yScaleOutput.oninput = function() {
  yScaleSlider.value = this.value;
  root.style.setProperty('--yScale', this.value);
}

var rotSlider = document.getElementById("rotSlider");
var rotOutput = document.getElementById("rotOutput");
rotOutput.value = rotSlider.value;
root.style.setProperty('--rotation', rotSlider.value + "deg");
root.style.setProperty('--negativeRot', -(rotSlider.value) + "deg");

rotSlider.oninput = function() {
  rotOutput.value = rotSlider.value;
  root.style.setProperty('--rotation', this.value + "deg");
  root.style.setProperty('--negativeRot', -(rotSlider.value) + "deg");
} 

rotOutput.oninput = function() {
  rotSlider.value = rotOutput.value;
  root.style.setProperty('--rotation', this.value + "deg");
  root.style.setProperty('--negativeRot', -(rotSlider.value) + "deg");
}


function applyXWobble(thing)
{
  xOutput.value = thing.value;
  xSlider.value = thing.value;
}

function applyYWobble(thing)
{
  yOutput.value = thing.value;
  ySlider.value = thing.value;
}

randSlider.oninput = function() {
  randOutput.value = this.value;
  random = this.value;
} 

randOutput.oninput = function() {
  randSlider.value = this.value;
  random = this.value;
}

var delaySlider = document.getElementById("delaySlider");
var delayOutput = document.getElementById("delayOutput");
delayOutput.value = delaySlider.value;
delayLength = delaySlider.value;

delaySlider.oninput = function() {
  delayOutput.value = this.value;
  delayLength = this.value;
  changeText();
} 

delayOutput.oninput = function() {
  delaySlider.value = this.value;
  delayLength = this.value;
  changeText();
}

var lengthSlider = document.getElementById("lengthSlider");
var lengthOutput = document.getElementById("lengthOutput");
lengthOutput.value = lengthSlider.value;
root.style.setProperty('--animLength', lengthSlider.value + "s");

lengthSlider.oninput = function() {
  lengthOutput.value = this.value;
  root.style.setProperty('--animLength', lengthSlider.value + "s");
} 

lengthOutput.oninput = function() {
  lengthSlider.value = this.value;
  root.style.setProperty('--animLength', lengthSlider.value + "s");
}

randSpeedSlider.oninput = function() {
  randSpeedOutput.value = this.value;
  randSpeed = randSpeedSlider.value;
  clearInterval(randomLoopInterval);
  randomLoopInterval = null;
  randomLoopInterval = setInterval(randomLoop, (randSpeed * 1000));
} 

randSpeedOutput.oninput = function() {
  randSpeedSlider.value = this.value;
  randSpeed = randSpeedSlider.value;
  clearInterval(randomLoopInterval);
  randomLoopInterval = null;
  randomLoopInterval = setInterval(randomLoop, (randSpeed * 1000));
}

var color = document.getElementById("color");
var gradientCheck = document.getElementById("gradientCheck");
var gradient = document.getElementById("gradient");
var colorSpan = document.getElementById("colorSpan");

var colors1 = document.getElementById("colors1");
var colors2 = document.getElementById("colors2");
var colors3 = document.getElementById("colors3");
var colors4 = document.getElementById("colors4");

checkColors();

color.oninput = function() {
  document.querySelector('.wobble').style.color = this.value;
}

gradientCheck.oninput = function() {
  checkColors();
}

function checkColors()
{
  if(gradientCheck.checked)
  {
    colorSpan.style.display = "none";
    gradient.style.display = "inline";
    document.querySelector('.wobble').style.color = "transparent";
    changeColors();
  }
  else
  {
    colorSpan.style.display = "inline";
    gradient.style.display = "none";
    document.querySelector('.wobble').style.color = color.value;
  }
}

function changeColors()
{
  root.style.setProperty('--color1', colors1.value);
  root.style.setProperty('--color2', colors2.value);
  root.style.setProperty('--color3', colors3.value);
  root.style.setProperty('--color4', colors4.value);
}

colors1.oninput = changeColors;
colors2.oninput = changeColors;
colors3.oninput = changeColors;
colors4.oninput = changeColors;

var gradientSlider = document.getElementById("gradientSlider");
var gradientOutput = document.getElementById("gradientOutput");
gradientOutput.value = gradientSlider.value;
root.style.setProperty('--gradientLength', gradientSlider.value + "s");

gradientSlider.oninput = function() {
  gradientOutput.value = this.value;
  root.style.setProperty('--gradientLength', this.value + "s");
} 

gradientOutput.oninput = function() {
  gradientSlider.value = this.value;
  root.style.setProperty('--gradientLength', this.value + "s");
}

var bgColor = document.getElementById("bgColor");
var bgGradientCheck = document.getElementById("bgGradientCheck");
var bgGradient = document.getElementById("bgGradient");
var bgColorSpan = document.getElementById("bgColorSpan");

var bgColors1 = document.getElementById("bgColors1");
var bgColors2 = document.getElementById("bgColors2");
var bgColors3 = document.getElementById("bgColors3");
var bgColors4 = document.getElementById("bgColors4");

checkbgColors();

bgColor.oninput = function() {
  changebgColorstoBG();
}

bgGradientCheck.oninput = function() {
  checkbgColors();
}

function checkbgColors()
{
  if(bgGradientCheck.checked)
  {
    bgColorSpan.style.display = "none";
    bgGradient.style.display = "inline";
    changebgColors();
  }
  else
  {
    changebgColorstoBG();
    bgColorSpan.style.display = "inline";
    bgGradient.style.display = "none";
  }
}

function changebgColors()
{
  root.style.setProperty('--bgColor1', bgColors1.value);
  root.style.setProperty('--bgColor2', bgColors2.value);
  root.style.setProperty('--bgColor3', bgColors3.value);
  root.style.setProperty('--bgColor4', bgColors4.value);
}

function changebgColorstoBG()
{
  root.style.setProperty('--bgColor1', bgColor.value);
  root.style.setProperty('--bgColor2', bgColor.value);
  root.style.setProperty('--bgColor3', bgColor.value);
  root.style.setProperty('--bgColor4', bgColor.value);
}

bgColors1.oninput = changebgColors;
bgColors2.oninput = changebgColors;
bgColors3.oninput = changebgColors;
bgColors4.oninput = changebgColors;

var bgGradientSlider = document.getElementById("bgGradientSlider");
var bgGradientOutput = document.getElementById("bgGradientOutput");
bgGradientOutput.value = bgGradientSlider.value;
root.style.setProperty('--bgGradientLength', bgGradientSlider.value + "s");

bgGradientSlider.oninput = function() {
  bgGradientOutput.value = this.value;
  root.style.setProperty('--bgGradientLength', this.value + "s");
} 

bgGradientOutput.oninput = function() {
  bgGradientSlider.value = this.value;
  root.style.setProperty('--bgGradientLength', this.value + "s");
}

var shadowSlider = document.getElementById("shadowSlider");
var shadowOutput = document.getElementById("shadowOutput");
var blurSlider = document.getElementById("blurSlider");
var blurOutput = document.getElementById("blurOutput");
var shadowColor = document.getElementById("shadowColor");
shadowSlider.value = shadowOutput.value;
blurSlider.value = blurOutput.value;
root.style.setProperty('--shadow', shadowSlider.value + "px");
root.style.setProperty('--shadowBlur', blurSlider.value + "px");
root.style.setProperty('--shadowColor', shadowColor.value);


shadowSlider.oninput = function() {
  shadowOutput.value = this.value;
  root.style.setProperty('--shadow', this.value + "px");
} 

shadowOutput.oninput = function() {
  shadowSlider.value = this.value;
  root.style.setProperty('--shadow', this.value + "px");
}

blurSlider.oninput = function() {
  blurOutput.value = this.value;
  root.style.setProperty('--shadowBlur', this.value + "px");
} 

blurOutput.oninput = function() {
  blurSlider.value = this.value;
  root.style.setProperty('--shadowBlur', this.value + "px");
}

shadowColor.oninput = function() {
  root.style.setProperty('--shadowColor', this.value);
}

var font = document.getElementById("font");
root.style.setProperty('--font', font.options[font.selectedIndex].value);

font.oninput = function() {
  root.style.setProperty('--font', font.options[font.selectedIndex].value);
}

var sizeSlider = document.getElementById("sizeSlider");
var sizeOutput = document.getElementById("sizeOutput");
sizeSlider.value = sizeOutput.value;
root.style.setProperty('--fontSize', sizeSlider.value + "px");

sizeSlider.oninput = function() {
  sizeOutput.value = this.value;
  root.style.setProperty('--fontSize', sizeSlider.value + "px");
} 

sizeOutput.oninput = function() {
  sizeSlider.value = this.value;
  root.style.setProperty('--fontSize', sizeSlider.value + "px");
}

var customtext = document.getElementById("customtext");
customtext.oninput = function() 
{
  changeText();
}
function changeText() {
  document.querySelector('.wobble').remove();
  let div = document.createElement('div');
  div.innerHTML = customtext.value;
  div.className = 'wobble';
  div.style.display = "flex";
  div.style.justifyContent = "center";
  div.style.alignItems = "center";
  div.style.height = "100%";
  div.style.width = "100%";
  div.style.backgroundClip = "text";
  div.style.backgroundImage = `linear-gradient(-45deg, var(--color1), var(--color2), var(--color3), var(--color4));`
  div.style.backgroundSize = "400% 400%";
  div.style.animation = "gradient 5s ease infinite";
  div.style.pointerEvents = "none";

  document.querySelector('.wobblecontainer').insertAdjacentElement("afterbegin", div)
  checkColors();
  wobbleInit();
}

var musicCheck = document.getElementById('musicCheck');
var wavesCheck = document.getElementById('wavesCheck');
var sfxCheck = document.getElementById('sfxCheck');
var paperCheck = document.getElementById('paperCheck');

function reset()
{
  customtext.value = 'wobble test'

  xSlider.value = 5;
  ySlider.value = 5;
  xScaleSlider.value = 1;
  yScaleSlider.value = 1;
  rotSlider.value = 5;
  randSlider.value = 10;
  randSpeedSlider.value = 0.4;
  delaySlider.value = 50;
  lengthSlider.value = 1;
  gradientSlider.value = 5;
  bgGradientSlider.value = 15;
  sizeSlider.value = 80;
  shadowSlider.value = 2;
  blurSlider.value = 2;
  shadowColor.value = "#000000";

  
  root.style.setProperty('--xWobble', xSlider.value + "%");
  root.style.setProperty('--yWobble', ySlider.value + "%");
  root.style.setProperty('--xScale', xScaleSlider.value);
  root.style.setProperty('--yScale', yScaleSlider.value);
  root.style.setProperty('--rotation', rotSlider.value + "deg");
  root.style.setProperty('--negativeRot', -(rotSlider.value) + "deg");
  root.style.setProperty('--animLength', lengthSlider.value + "s");
  root.style.setProperty('--gradientLength', gradientSlider.value + "s");
  root.style.setProperty('--bgGradientLength', gradientSlider.value + "s");
  root.style.setProperty('--shadow', shadowSlider.value + "px");
  root.style.setProperty('--shadowColor', shadowColor.value);
  root.style.setProperty('--shadowBlur', blurSlider.value + "px");
  root.style.setProperty('--font', 'comicsans');
  font.selectedIndex = 0;
  root.style.setProperty('--fontSize', sizeSlider.value + "px");
  random = randSlider.value;
  delayLength = delaySlider.value;
  randSpeed = randSpeedSlider.value;

  xOutput.value = xSlider.value;
  yOutput.value = ySlider.value;
  xScaleOutput.value = xScaleSlider.value;
  yScaleOutput.value = yScaleSlider.value;
  rotOutput.value = rotSlider.value;
  randOutput.value = randSlider.value;
  delayOutput.value = delaySlider.value;
  lengthOutput.value = lengthSlider.value;
  randSpeedOutput.value = randSpeedSlider.value;
  gradientOutput.value = gradientSlider.value;
  bgGradientOutput.value = bgGradientSlider.value;
  sizeOutput.value = sizeSlider.value;
  shadowOutput.value = shadowSlider.value;
  blurOutput.value = blurSlider.value;

  color.value = "#000000";
  colors1.value = "#ff0000";
  colors2.value = "#ffff00";
  colors3.value = "#00ff00";
  colors4.value = "#0000ff";

  bgColor.value = "#ffffff";
  bgColors1.value = "#ffdede";
  bgColors2.value = "#fffcde";
  bgColors3.value = "#deffdf";
  bgColors4.value = "#dedeff";

  gradientCheck.checked = false;
  bgGradientCheck.checked = true;
  musicCheck.checked = true;
  wavesCheck.checked = true;
  sfxCheck.checked = true;
  paperCheck.checked = true;

  bgMusic.play();

  document.getElementById('paper').style.display = "block";

  if(!oscillator) {playFrequency();}

  checkColors();
  checkbgColors();

  clearInterval(randomLoopInterval);
  randomLoopInterval = null;
  randomLoopInterval = setInterval(randomLoop, (randSpeed * 1000));

  changeText();
}

function hideSettings()
{
  document.getElementById("allSettings").style.display = "none";
  document.getElementById("showSettings").style.display = "block";
}

function showSettings()
{
  document.getElementById("allSettings").style.display = "block";
  document.getElementById("showSettings").style.display = "none";
  if(musicCheck.checked)
  {
    bgMusic.play();
  }
  if(wavesCheck.checked && !oscillator)
  {
    playFrequency();
  }
}

paperCheck.oninput = function() {
  if(paperCheck.checked)
  {
    document.getElementById('paper').style.display = "block";
  }
  else
  {
    document.getElementById('paper').style.display = "none";
  }
}

musicCheck.oninput = function() {
  checkbgMusic();
}

function checkbgMusic()
{
  if(musicCheck.checked)
  {
    bgMusic.play();
  }
  else
  {
    bgMusic.pause();
  }
}

let audioContext;
let oscillator;
let gainNode;

let waveLoop;

function playFrequency() {
  // Create audio context if it doesn't exist
  if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  // Create oscillator node
  oscillator = audioContext.createOscillator();
  oscillator.type = 'triangle'; // Type of waveform (sine, square, sawtooth, triangle)

  // Create gain node (volume control)
  gainNode = audioContext.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  gainNode.gain.value = 0.2;

  waveLoop = setInterval(newFrequency, 1);

  // Start the oscillator
  oscillator.start();
}

function newFrequency()
{
  let animLength = parseFloat(root.style.getPropertyValue('--animLength').replace('s', ''));
  let xWobble = Math.abs(parseFloat(root.style.getPropertyValue('--xWobble').replace('%', '')));
  let yWobble = Math.abs(parseFloat(root.style.getPropertyValue('--yWobble').replace('%', '')));
  let xScale = Math.abs(parseFloat(root.style.getPropertyValue('--xScale').replace('%', '')));
  let yScale = Math.abs(parseFloat(root.style.getPropertyValue('--yScale').replace('%', '')));
  let rotation = Math.abs(parseFloat(root.style.getPropertyValue('--rotation').replace('deg', '')));
  let fontSize = Math.abs(parseFloat(root.style.getPropertyValue('--fontSize').replace('px', '')));

  let randomFrequency = (500 + ((yWobble + xWobble) * 2)  + (random * 2)) + (rotation * 2) - (
    Math.abs(((animLength * 200) + (randSpeed * 10)) +
    (currentX + currentY) + fontSize + ((xScale + yScale) * 50)
  ));
  randomFrequency += (((animLength * 20) + (random * randSpeed)) * (Math.random() * 2 - 1));

  oscillator.frequency.setValueAtTime(randomFrequency, audioContext.currentTime);
}

function stopFrequency() {
  if (oscillator) {
      clearInterval(waveLoop);
      waveLoop = null;

      gainNode.gain.value = 0;
      oscillator.stop();
      oscillator.disconnect();
      oscillator = null;
  }
}

wavesCheck.oninput = function() {
  if(wavesCheck.checked && !oscillator)
  {
    playFrequency();
  }
  else
  {
    stopFrequency();
  }
}

let inputs = document.querySelectorAll('input[type="range"], textarea, input[type="checkbox"], input[type="color"], select');
let sliderSound = document.getElementById('sliderSound');
let textSound = document.getElementById('textSound');
let checkSound = document.getElementById('checkSound');
let miscSound = document.getElementById('miscSound');

inputs.forEach((input) => {
  input.addEventListener('input', function() {
    if(!sfxCheck.checked) {return;}

    let soundEffect;
    if (input.type === 'range') {
      soundEffect = sliderSound;
    } 
    else if (input.tagName.toLowerCase() === 'textarea') {
      soundEffect = textSound;
    } 
    else if (input.type === 'checkbox') {
      soundEffect = checkSound;
    } 
    else {
      soundEffect = miscSound;
    }

    const sfx = soundEffect.cloneNode();
    sfx.play();
    document.body.appendChild(sfx);

    // Remove the cloned audio element after it finishes playing
    sfx.addEventListener('ended', function() {
        document.body.removeChild(sfx);
    });
  });
});

let buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
  button.addEventListener('click', function() {
      if (!sfxCheck.checked) { return; }

      const sfx = miscSound.cloneNode();
      sfx.play();
      document.body.appendChild(sfx);

      sfx.addEventListener('ended', function() {
          document.body.removeChild(sfx);
      });
  });
});