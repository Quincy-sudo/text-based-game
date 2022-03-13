const textElement = document.getElementById('text');

const optionButtonsElement = document.getElementById('option-buttons');

let state = {};

function startGame() {
  state = {};

  showTextNode(1);
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);

  textElement.innerText = textNode.text;

  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  textNode.options.forEach((option) => {
    if (showOption(option)) {
      const button = document.createElement('button');
      button.innerText = option.text;
      button.classList.add('btn');

      button.addEventListener('click', () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  });
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    return startGame();
  }
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId);
}

const textNodes = [
  {
    id: 1,
    text: 'You wake up a room in the top floor. you see a flashlight, do you take the flashlight?',

    options: [
      {
        text: 'Take the flashlight',

        setState: {
          flashlight: true,
        },

        nextText: 2,
      },
      {
        text: 'Leave the flashlight',
        nextText: 2,
      },
    ],
  },

  {
    id: 2,
    text: 'You venture forth in search of answers to where you are when you come across a shadow."do you have a flashlight dear"',
    options: [
      {
        text: 'give the shadow the flashlight and gain a dagger',
        requiredState: (currentState) => currentState.flashlight,
        setState: {
          flashlight: false,
          dagger: true,
        },
        nextText: 3,
      },
      {
        text: 'give the shadow the flashlight and gain a shield',
        requiredState: (currentState) => currentState.flashlight,
        setState: {
          flashlight: false,
          shield: true,
        },
        nextText: 3,
      },
      {
        text: 'Ignore the shadow',
        nextText: 3,
      },
    ],
  },

  {
    id: 3,
    text: 'After leaving the shadow you start to feel tired and stumble upon a comfy bed and a open door',
    options: [
      {
        text: 'go through the door',
        nextText: 4,
      },
      {
        text: 'sleep in the bed',
        nextText: 5,
      },
    ],
  },
  {
    id: 4,
    text: 'You are so tired that you fall asleep while exploring the house and are killed by some terrible monster in your sleep.',
    options: [
      {
        text: 'Restart',
        nextText: -1,
      },
    ],
  },

  {
    id: 5,
    text: 'You wake up well rested and full of energy ready to explore the house',
    options: [
      {
        text: 'Explore the house',
        nextText: 7,
      },
    ],
  },
  {
    id: 7,
    text: 'While exploring the house you come across a horrible monster in your path.',
    options: [
      {
        text: 'Try to run',
        nextText: 8,
      },
      {
        text: 'Attack it with your dagger',
        requiredState: (currentState) => currentState.dagger,
        nextText: 9,
      },
      {
        text: 'Hide behind your shield',
        requiredState: (currentState) => currentState.shield,
        nextText: 10,
      },
      {
        text: 'use the flashlight on the monster',
        requiredState: (currentState) => currentState.flashlight,
        nextText: 11,
      },
    ],
  },
  {
    id: 8,
    text: 'Your attempts to run are in vain and the monster easily catches.',
    options: [
      {
        text: 'Restart',
        nextText: -1,
      },
    ],
  },
  {
    id: 9,
    text: 'You foolishly thought this monster could be slain with a single dagger.',
    options: [
      {
        text: 'Restart',
        nextText: -1,
      },
    ],
  },
  {
    id: 10,
    text: 'The monster laughed as you hid behind your shield and ate you.',
    options: [
      {
        text: 'Restart',
        nextText: -1,
      },
    ],
  },
  {
    id: 11,
    text: 'You shine the flashlight at the monster and it runs away',
    options: [
      {
        text: 'you laugh as you survive another night against the monster',
        nextText: -1,
      },
    ],
  },
];
// calling startGame as soon as the user loads the game
startGame();
